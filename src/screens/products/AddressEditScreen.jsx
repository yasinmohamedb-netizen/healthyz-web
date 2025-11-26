import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BASE_URL } from "../../context/config";
import { runAddressCallback } from "../../utils/AddressCallback";

export default function AddressEditScreen() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    isDefault: false,
    _id: null,
  });

  const loadUserAddresses = async () => {
    if (!userData?.firebaseUid) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/users/firebase/${userData.firebaseUid}`);
      const user = res.data;
      setAddresses(user.addresses || []);
      setUserData(user);
    } catch (err) {
      console.log("LOAD ADDRESSES ERROR:", err);
      window.alert("Unable to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserAddresses();
  }, [userData?.firebaseUid]);

  useEffect(() => {
    if (!editingId) {
      setForm({
        name: "",
        mobile: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        isDefault: false,
        _id: null,
      });
      return;
    }
    const addr = addresses.find((a) => a._id === editingId);
    if (addr) setForm({ ...addr });
  }, [editingId, addresses]);

  const saveAddress = async () => {
    const { line1, city, state, zipcode, country, mobile } = form;
    if (!line1 || !city || !state || !zipcode || !country || !mobile) {
      window.alert("Please fill all required fields.");
      return;
    }
    try {
      setLoading(true);
      let updated = [...addresses];

      if (editingId) {
        updated = updated.map((addr) => (addr._id === editingId ? form : addr));
      } else {
        updated.push({ ...form, _id: Date.now().toString() });
      }

      if (form.isDefault) {
        const newDef = editingId || updated[updated.length - 1]._id;
        updated = updated.map((a) => ({
          ...a,
          isDefault: a._id === newDef,
        }));
      }

      await axios.put(
        `${BASE_URL}/users/firebase/${userData.firebaseUid}/addresses`,
        { addresses: updated }
      );

      await loadUserAddresses();

      const finalAddress =
        updated.find((a) => a.isDefault) || updated[updated.length - 1];
      runAddressCallback(finalAddress);

      window.alert("Address saved successfully");
    } catch (err) {
      console.log("SAVE ERROR:", err);
      window.alert("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      setLoading(true);
      const updated = addresses.filter((a) => a._id !== id);
      await axios.put(
        `${BASE_URL}/users/firebase/${userData.firebaseUid}/addresses`,
        { addresses: updated }
      );
      await loadUserAddresses();
      window.alert("Address deleted");
    } catch (err) {
      console.log("DELETE ERROR:", err);
      window.alert("Failed to delete address");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="addr-wrapper">
        <p style={{ textAlign: "center", padding: 20 }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="addr-wrapper">
      <div className="addr-card">
        <h1 className="addr-title">
          {editingId ? "Edit Address" : "Add New Address"}
        </h1>

        <div className="addr-form">
          {[
            ["name", "Recipient Name (Optional)"],
            ["mobile", "Mobile Number *"],
            ["line1", "Street Address Line 1 *"],
            ["line2", "Street Address Line 2 (Optional)"],
            ["city", "City *"],
            ["state", "State *"],
            ["zipcode", "Pincode *"],
            ["country", "Country *"],
          ].map(([key, placeholder]) => (
            <input
              key={key}
              className="addr-input"
              placeholder={placeholder}
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}

          <label className="addr-checkbox">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={() =>
                setForm({ ...form, isDefault: !form.isDefault })
              }
            />
            <span>Set as Default Address</span>
          </label>
        </div>

        <button className="addr-save-btn" onClick={saveAddress} disabled={loading}>
          {editingId ? "Update Address" : "Add Address"}
        </button>

        <h2 className="addr-subtitle">Saved Addresses</h2>

        {addresses.length === 0 ? (
          <p className="addr-empty">No addresses yet.</p>
        ) : (
          <div className="addr-list">
            {addresses.map((a) => (
              <div
                key={a._id}
                className={`addr-item ${a.isDefault ? "addr-default" : ""}`}
              >
                <div className="addr-info">
                  {a.name && <p className="addr-name">{a.name}</p>}
                  <p>{a.line1}</p>
                  {a.line2 && <p>{a.line2}</p>}
                  <p>
                    {a.city}, {a.state} {a.zipcode}
                  </p>
                  <p>
                    {a.country} • 📞 {a.mobile}
                  </p>
                </div>
                <div className="addr-actions">
                  {a.isDefault && (
                    <span className="addr-badge">DEFAULT</span>
                  )}
                  <button
                    className="addr-edit"
                    onClick={() => setEditingId(a._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="addr-delete"
                    onClick={() => deleteAddress(a._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{addressStyles}</style>
    </div>
  );
}

const addressStyles = `
.addr-wrapper { 
  background:#f3f4f6; 
  min-height:100vh; 
  padding:20px; 
  display: flex; 
  justify-content: center;
  align-items: flex-start;
}

.addr-card { 
  width: 100%;
  max-width:700px; 
  background:white; 
  padding:25px; 
  border-radius:16px; 
  box-shadow:0 2px 12px rgba(0,0,0,0.08); 
  display: flex;
  flex-direction: column;
}

.addr-title { 
  text-align:center; 
  font-size:26px; 
  font-weight:bold; 
  margin-bottom:20px; 
}

.addr-form { 
  display:grid; 
  gap:15px; 
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.addr-input { 
  padding:12px; 
  border:1px solid #d1d5db; 
  border-radius:8px; 
  background:#f9fafb; 
  font-size: 1rem;
}

.addr-checkbox { 
  display:flex; 
  align-items:center; 
  gap:8px; 
  cursor:pointer; 
  grid-column: span 2;
  font-size: 1rem;
}

.addr-save-btn { 
  width:100%; 
  background:#f97316; 
  color:white; 
  padding:12px; 
  font-size:18px; 
  border:none; 
  border-radius:8px; 
  margin-top:20px; 
  cursor:pointer; 
  transition: background-color 0.3s ease;
}

.addr-save-btn:disabled {
  background-color: #fbbf24;
  cursor: not-allowed;
}

.addr-subtitle { 
  margin-top:25px; 
  font-weight:bold; 
  font-size: 20px;
}

.addr-list { 
  display:grid; 
  gap:15px; 
  margin-top:10px; 
}

.addr-item { 
  border:1px solid #d1d5db; 
  border-radius:12px; 
  padding:15px; 
  background:#fff; 
  display: flex;
  flex-direction: column;
}

.addr-default { 
  background:#fff7ed; 
  border-color:#fb923c; 
}

.addr-name { 
  font-weight:bold; 
  margin-bottom:4px; 
}

.addr-info p {
  margin: 2px 0;
  font-size: 0.9rem;
}

.addr-actions { 
  display:flex; 
  gap:12px; 
  margin-top:10px; 
  flex-wrap: wrap;
  justify-content: flex-start;
}

.addr-edit, .addr-delete {
  font-size: 1rem;
  padding: 6px 10px;
  border:none;
  background:none;
  cursor:pointer;
  transition: color 0.3s ease;
}

.addr-edit:hover {
  color: #c86009;
}

.addr-delete:hover {
  color: #b91c1c;
}

.addr-badge { 
  background:#0d9488; 
  color:white; 
  padding:4px 10px; 
  border-radius:9999px; 
  font-size:10px; 
  align-self: flex-start;
  margin-bottom: 8px;
}

.addr-empty { 
  color:#666; 
  padding:10px 0; 
  font-size: 1rem;
}

/* Responsive adjustments */

/* Tablet */
@media (max-width: 768px) {
  .addr-form {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .addr-save-btn {
    font-size: 16px;
    padding: 10px;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .addr-form {
    grid-template-columns: 1fr;
  }

  .addr-checkbox {
    grid-column: span 1;
  }

  .addr-actions {
    justify-content: space-between;
    gap: 8px;
  }

  .addr-edit, .addr-delete {
    font-size: 0.9rem;
  }

  .addr-title {
    font-size: 22px;
  }

  .addr-subtitle {
    font-size: 18px;
  }
}
`;
