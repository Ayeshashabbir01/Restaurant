import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod' | 'online'
  const [processing, setProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const navigate = useNavigate();

  const handleInput = (k) => (e) => setDetails({ ...details, [k]: e.target.value });

  const canPlace =
    details.name.trim() && details.phone.trim() && details.address.trim() && cart.length > 0;

  const saveOrderToStorage = (order) => {
    const prev = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([order, ...prev]));
    localStorage.setItem("last_order", JSON.stringify(order));
  };

  const placeOrder = async () => {
    if (!canPlace) {
      alert("Please complete your details and add items to cart.");
      return;
    }

    const baseOrder = {
      id: Date.now(),
      full_name: details.name,
      phone: details.phone,
      address: details.address,
      items: cart,
      total: getTotal(),
      status: "pending",
      created_at: new Date().toISOString(),
      payment: {
        method: paymentMethod,        // 'cod' | 'online'
        status: paymentMethod === "cod" ? "unpaid" : "pending", // online -> pending until simulated success
      },
    };

    if (paymentMethod === "cod") {
      // Cash on Delivery: instantly place order
      saveOrderToStorage(baseOrder);
      clearCart();
      setPlacedOrderId(baseOrder.id);
      alert("Order placed! Payment: Cash on Delivery.");
      navigate(`/orders/${baseOrder.id}`);
    } else {
      // Online: simulate payment processing
      setProcessing(true);
      setTimeout(() => {
        const paidOrder = {
          ...baseOrder,
          payment: { method: "online", status: "paid" },
          status: "preparing", // assume payment success moves it forward
        };
        saveOrderToStorage(paidOrder);
        clearCart();
        setProcessing(false);
        setPlacedOrderId(paidOrder.id);
        alert("Payment successful! Order placed.");
        navigate(`/orders/${paidOrder.id}`);
      }, 1200); // simulate gateway delay
    }
  };

  const goToLastOrderTracking = () => {
    const last = JSON.parse(localStorage.getItem("last_order") || "null");
    if (!last) return alert("No placed orders yet.");
    navigate(`/orders/${last.id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      {/* --- Order Tracking shortcut on Checkout --- */}
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={goToLastOrderTracking}
          style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #444", background: "#111", color: "white" }}
        >
          🔎 Order Tracking
        </button>
      </div>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Summary */}
          <div style={{ flex: 1, minWidth: 300, background: "#111", color: "#fff", padding: 16, borderRadius: 10 }}>
            <h3>Order Summary</h3>
            <ul>
              {cart.map((it) => (
                <li key={it.id}>
                  {it.name} × {it.quantity} = Rs. {it.quantity * it.price}
                </li>
              ))}
            </ul>
            <p><strong>Total: Rs. {getTotal()}</strong></p>
          </div>

          {/* Details + Payment */}
          <div style={{ flex: 1, minWidth: 300, background: "#111", color: "#fff", padding: 16, borderRadius: 10 }}>
            <h3>Your Details</h3>
            <input
              placeholder="Full name"
              value={details.name}
              onChange={handleInput("name")}
              style={{ width: "100%", padding: 8, marginBottom: 8, background: "#0b0b0b", color: "white", border: "1px solid #333", borderRadius: 6 }}
            />
            <input
              placeholder="Phone"
              value={details.phone}
              onChange={handleInput("phone")}
              style={{ width: "100%", padding: 8, marginBottom: 8, background: "#0b0b0b", color: "white", border: "1px solid #333", borderRadius: 6 }}
            />
            <textarea
              placeholder="Address"
              value={details.address}
              onChange={handleInput("address")}
              rows={4}
              style={{ width: "100%", padding: 8, marginBottom: 8, background: "#0b0b0b", color: "white", border: "1px solid #333", borderRadius: 6 }}
            />

            <h3>Payment Method</h3>
            <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name="pm"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>

              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name="pm"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                Online Payment (Simulated)
              </label>

              {paymentMethod === "online" && (
                <div style={{ fontSize: 13, color: "#bbb" }}>
                  This is a demo payment. We’ll simulate success after a short processing time.
                </div>
              )}
            </div>

            <button
              onClick={placeOrder}
              disabled={!canPlace || processing}
              style={{
                padding: "10px 16px",
                background: processing ? "#555" : "teal",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: processing ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {processing ? "Processing Payment..." : "Place Order"}
            </button>

            {placedOrderId && (
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button
                  onClick={() => navigate(`/orders/${placedOrderId}`)}
                  style={{ padding: "8px 12px", background: "orange", border: "none", color: "white", borderRadius: 6 }}
                >
                  Go to Order Tracking
                </button>
                <button
                  onClick={() => navigate("/")}
                  style={{ padding: "8px 12px", background: "#222", border: "1px solid #444", color: "white", borderRadius: 6 }}
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
