// src/pages/MenuItemDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import "./MenuItemDetail.css";

const API_BASE = "http://127.0.0.1:8000/api/menu-items/";

const POS = ["great","tasty","awesome","fresh","love","good","delicious","best","amazing","nice","yummy","excellent","perfect"];
const NEG = ["bad","cold","worst","poor","slow","hate","stale","overcooked","undercooked","oily","expensive","terrible"];

export default function MenuItemDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);
  const [spice, setSpice] = useState("medium");
  const [addons, setAddons] = useState({ cheese:false, sauce:false, extra_naan:false });

  // reviews stored per-item in localStorage
  const [comments, setComments] = useState(() => {
    try {
      const raw = localStorage.getItem("reviews_" + id) || "[]";
      return JSON.parse(raw);
    } catch { return []; }
  });
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        // try detail endpoint first
        const res = await axios.get(`${API_BASE}${id}/`);
        if (!mounted) return;
        setItem(res.data);
      } catch (err) {
        // fallback: fetch list and find item by id
        try {
          const listRes = await axios.get(API_BASE);
          if (!mounted) return;
          setAllItems(listRes.data || []);
          const found = (listRes.data || []).find(r => String(r.id) === String(id));
          setItem(found || null);
        } catch (err2) {
          console.error("Error fetching items", err2);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [id]);

  useEffect(() => {
    // keep allItems if item endpoint returned single, still fetch list for similar
    let mounted = true;
    (async () => {
      if (allItems.length === 0) {
        try {
          const r = await axios.get(API_BASE);
          if (!mounted) return;
          setAllItems(r.data || []);
        } catch (e) {
          // ignore
        }
      }
    })();
    return () => { mounted = false; };
  }, [allItems.length]);

  // gallery from image_url (fallback)
  const gallery = useMemo(() => {
    if (!item) return [];
    const base = item.image_url || item.image || "";
    return [base, base, base].filter(Boolean);
  }, [item]);

  // rating derived from comments
  const averageRating = useMemo(() => {
    if (!comments.length) return (item && item.rating) || 4.5;
    const avg = comments.reduce((s, c) => s + (c.rating || 0), 0) / comments.length;
    return Math.round(avg * 10) / 10;
  }, [comments, item]);

  const totalReviews = comments.length;

  // discount logic
  const discountPct = item?.discount_percentage || (item?.is_deal ? 10 : 0);
  const originalPrice = item?.price || 0;
  const discountedPrice = discountPct ? Math.round(originalPrice * (1 - discountPct/100)) : originalPrice;

  // Ingredients & allergy fallback
  const ingredients = item?.ingredients || ["Chicken", "Tomato", "Onion", "Ginger", "Garlic", "Salt", "Spices"];
  const allergy = item?.allergy_info || ["May contain dairy", "May contain gluten"];

  // nutrition fallback
  const nutrition = item?.nutrition || { Calories: "350 kcal", Protein: "25 g", Carbs: "20 g", Fat: "12 g" };

  const similar = useMemo(() => {
    if (!item || !allItems.length) return [];
    const cat = item?.category?.name || item?.category || "Others";
    return allItems.filter(i => i.id !== item.id && (i.category?.name || i.category || "Others") === cat).slice(0, 8);
  }, [item, allItems]);

  const submitReview = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const newR = { id: Date.now(), name: form.name, rating: Number(form.rating), text: form.text, time: "just now" };
    const updated = [newR, ...comments];
    setComments(updated);
    localStorage.setItem("reviews_" + id, JSON.stringify(updated));
    setForm({ name: "", rating: 5, text: "" });
  };

  // sentiment simple
  const sentiment = useMemo(() => {
    if (!comments.length) return { pos: 0, neu: 100, neg: 0 };
    let pos = 0, neg = 0;
    comments.forEach(c => {
      const t = c.text.toLowerCase();
      const p = POS.some(w => t.includes(w));
      const n = NEG.some(w => t.includes(w));
      if (p && !n) pos++;
      else if (n && !p) neg++;
    });
    const total = comments.length;
    const neu = Math.max(total - pos - neg, 0);
    return {
      pos: Math.round((pos/total)*100),
      neu: Math.round((neu/total)*100),
      neg: Math.round((neg/total)*100),
    };
  }, [comments]);

  const toggleAddon = (k) => setAddons(a => ({ ...a, [k]: !a[k] }));

  const handleAddToCart = () => {
    if (!item) return;
    addToCart({
      id: item.id,
      name: item.name,
      price: discountedPrice,
      image_url: item.image_url,
      options: { spice, addons }
    }, qty);
    // small toast alternative
    alert(`${qty} × ${item.name} added to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) return <div style={{padding:20}}>Loading item details...</div>;
  if (!item) return <div style={{ padding:20 }}><p>Item not found.</p><Link to="/full-menu">← Back to Full Menu</Link></div>;

  return (
    <div className="detail-wrap">
      <header className="detail-header">
        <div>
          <h1 className="dish-title">{item.name}</h1>
          <div className="meta-row">
            <span className="pill">{item.category?.name || item.category || "Uncategorized"}</span>
            <span className="rating">
              {"★".repeat(Math.round(averageRating))} <span className="rating-num">{averageRating}</span> ({totalReviews} reviews)
            </span>
            {item.is_deal && <span className="tag best">Best Seller</span>}
            {discountPct >= 20 && <span className="tag chef">Chef's Special</span>}
          </div>
        </div>
        <Link to="/full-menu" className="back-link">← Back to Full Menu</Link>
      </header>

      <section className="gallery">
        <div className="main-img">
          <img src={gallery[0]} alt={item.name} />
        </div>
        <div className="thumbs">
          {gallery.map((g, i) => (
            <img key={i} src={g} alt={`${item.name}-${i}`} />
          ))}
          {item.video_url && (
            <video src={item.video_url} controls className="thumb-video" />
          )}
        </div>
      </section>

      <section className="price-desc">
        <div className="price-box">
          {discountPct ? (
            <div className="price-row">
              <span className="price-now">Rs. {discountedPrice}</span>
              <span className="price-old">Rs. {originalPrice}</span>
              <span className="off">-{discountPct}%</span>
            </div>
          ) : (
            <div className="price-row">
              <span className="price-now">Rs. {originalPrice}</span>
            </div>
          )}
        </div>

        <div className="desc">
          <h3>Description</h3>
          <p>{item.description || "Aromatic, freshly prepared and full of flavor."}</p>
        </div>
      </section>

      <section className="ingredients">
        <div>
          <h3>Ingredients</h3>
          <ul className="ing-list">
            {ingredients.map((it, idx) => (
              <li key={idx}><span className="dot" /> {it}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Allergy Info</h3>
          <ul className="allergy">
            {allergy.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="nutrition">
        <h3>Nutritional Info</h3>
        <table>
          <tbody>
            {Object.entries(nutrition).map(([k, v]) => (
              <tr key={k}><td>{k}</td><td>{v}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="serving">
        <div className="chip">Portion: {item.serving || "Serves 1"}</div>
        <div className="chip">Prep Time: {item.prep_time || "20 min"}</div>
        <div className="chip">Style: {item.style || (item.category?.name || "House Special")}</div>
      </section>

      <section className="custom-cart">
        <div className="custom">
          <h3>Customization</h3>

          <div className="field">
            <label>Spice Level:</label>
            <div className="radio-row">
              {["mild","medium","spicy"].map(level => (
                <label key={level}>
                  <input type="radio" name="spice" checked={spice===level} onChange={() => setSpice(level)} /> {level}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Add-ons:</label>
            <div className="radio-row">
              <label><input type="checkbox" checked={addons.cheese} onChange={() => toggleAddon("cheese")} /> Extra cheese</label>
              <label><input type="checkbox" checked={addons.sauce} onChange={() => toggleAddon("sauce")} /> Extra sauce</label>
              <label><input type="checkbox" checked={addons.extra_naan} onChange={() => toggleAddon("extra_naan")} /> Extra Naan</label>
            </div>
          </div>
        </div>

        <div className="cart-actions">
          <div className="qty">
            <button onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q+1)}>+</button>
          </div>

          <button className="add" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </section>

      <section className="reviews">
        <h3>User Reviews</h3>
        <ul className="review-list">
          {comments.map(c => (
            <li key={c.id} className="review">
              <div className="avatar">{c.name?.[0]?.toUpperCase()}</div>
              <div>
                <div className="r-head"><strong>{c.name}</strong><span>{"★".repeat(c.rating)}</span><small> ({c.time})</small></div>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <form className="review-form" onSubmit={submitReview}>
          <h4>Leave a review</h4>
          <input placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}>
            {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} Stars</option>)}
          </select>
          <textarea placeholder="Your comments..." value={form.text} onChange={e => setForm({...form, text: e.target.value})} />
          <button type="submit">Submit</button>
        </form>
      </section>

      <section className="sentiment">
        <h3>Customer Sentiment</h3>
        <div className="donut" style={{
          background: `conic-gradient(#22c55e 0% ${sentiment.pos}%, #eab308 ${sentiment.pos}% ${sentiment.pos+sentiment.neu}%, #ef4444 ${sentiment.pos+sentiment.neu}% 100%)`
        }} />
        <div className="legend">
          <span className="lg lg-pos">Positive {sentiment.pos}%</span>
          <span className="lg lg-neu">Neutral {sentiment.neu}%</span>
          <span className="lg lg-neg">Negative {sentiment.neg}%</span>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="similar">
          <h3>Similar Dishes</h3>
          <div className="carousel">
            {similar.map(s => (
              <Link key={s.id} to={`/menu/${s.id}`} className="sim-card">
                <img src={s.image_url} alt={s.name} />
                <div className="sim-name">{s.name}</div>
                <div className="sim-price">Rs. {s.price}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="notes">
        <p><strong>Allergy:</strong> Please inform us of any allergies (gluten, nuts, dairy).</p>
        <p><strong>Cooking Method:</strong> Typically grilled/stir-fried; may vary by outlet.</p>
        <p><strong>Special Requests:</strong> Call us at 03xx-xxxxxxx.</p>
      </section>
    </div>
  );
}
