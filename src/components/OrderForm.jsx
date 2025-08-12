import React, { useState } from 'react';
import axios from 'axios';

function OrderForm({ orderItems, onOrderSuccess }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (orderItems.length === 0) {
      setError('Please add items to your order before submitting.');
      return;
    }

    const payload = {
      full_name: fullName,
      phone,
      address,
      items: orderItems.map(item => ({
        menu_item: item.id,
        quantity: item.quantity,
      })),
    };

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/orders/', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError('');
      setFullName('');
      setPhone('');
      setAddress('');
      onOrderSuccess();
      alert('Order placed successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Place Your Order</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
