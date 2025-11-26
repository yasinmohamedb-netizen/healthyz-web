// src/screens/Services/Pilates.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pilates.css";

// ---------- STATIC DATA ----------
const TRAINERS = [
  {
    id: "anita",
    name: "Anita Desai",
    specialty: "Pilates & Core Strength",
    image:
      "https://images.pexels.com/photos/4324026/pexels-photo-4324026.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#439BAE",
    times: ["6:30 AM", "7:30 AM", "6:00 PM", "7:00 PM"],
  },
  {
    id: "vikram",
    name: "Vikram Patel",
    specialty: "Reformer Pilates",
    image:
      "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#F29100",
    times: ["7:00 AM", "8:00 AM", "5:30 PM", "6:30 PM"],
  },
];

const PLANS = [
  { id: "single", name: "Single Session", price: 500, subtitle: "1x 60 min" },
  { id: "weekly", name: "Weekly Pack", price: 1500, subtitle: "7x 60 min" },
  { id: "monthly", name: "Monthly Pack", price: 6000, subtitle: "Unlimited classes" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Pilates() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  // STATES
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);

  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [selectedTimes, setSelectedTimes] = useState({});
  const [customTime, setCustomTime] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [selectedDays, setSelectedDays] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // Get Firebase User (NO redirect)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsub();
  }, []);

  const selectedTrainer = useMemo(
    () => TRAINERS.find((t) => t.id === selectedTrainerId),
    [selectedTrainerId]
  );

  // HELPERS
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const validatePhone = (text) => {
    let formatted = text.replace(/[\s-]/g, "");

    if (formatted.startsWith("0")) formatted = formatted.substring(1);
    if (!formatted.startsWith("+91") && formatted.length <= 10) {
      formatted = "+91" + formatted;
    }

    setContact(formatted);

    const valid = /^\+91[6-9]\d{9}$/;
    setPhoneError(valid.test(formatted) ? "" : "Invalid WhatsApp number.");
  };

  // STEP 1 → STEP 2
  const nextStep1 = () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!selectedTrainerId || (!selectedTimes[selectedTrainerId] && !customTime)) {
      alert("Please select a trainer and time.");
      return;
    }

    setStep(2);
  };

  // STEP 2 → STEP 3
  const nextStep2 = () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!name.trim() || !age.trim() || !contact.trim()) {
      alert("Fill all fields.");
      return;
    }
    if (phoneError) {
      alert("Invalid WhatsApp number.");
      return;
    }

    setStep(3);
  };

  // FINAL SUBMIT
  const handleSubmit = async () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const bookingTime = customTime || selectedTimes[selectedTrainerId];

    const bookingData = {
      type: "training",
      userId,
      userName: name.trim(),
      userMobile: contact.trim(),
      age: age.trim(),
      gender: "N/A",
      address: "N/A",
      serviceName: "Pilates Training",
      days: selectedDays,
      preferredDate: new Date().toISOString(),
      timeSlot: bookingTime,
      notes: notes.trim(),
      plan: selectedPlan,
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(`Pilates session booked with ${selectedTrainer?.name}!`);
      navigate("/bookings");
    } catch (err) {
      alert("Error while booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-wrapper">

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h1 className="pt-title">Choose Pilates Trainer & Time</h1>

          {TRAINERS.map((trainer) => (
            <div key={trainer.id} className="pt-trainer-card">
              <img src={trainer.image} alt={trainer.name} className="pt-trainer-img" />

              <h3 className="pt-trainer-name" style={{ color: trainer.accent }}>
                {trainer.name}
              </h3>
              <p className="pt-trainer-specialty">{trainer.specialty}</p>

              <div className="pt-time-container">
                {trainer.times.map((time) => {
                  const active =
                    selectedTrainerId === trainer.id &&
                    selectedTimes[trainer.id] === time;

                  return (
                    <button
                      key={time}
                      className={`pt-time-btn ${active ? "active" : ""}`}
                      style={{
                        backgroundColor: active ? trainer.accent : "white",
                        borderColor: active ? trainer.accent : "#ccc",
                      }}
                      onClick={() => {
                        setSelectedTrainerId(trainer.id);
                        setSelectedTimes({ [trainer.id]: time });
                        setCustomTime("");
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                className="pt-input"
                placeholder="Or enter your convenient time"
                value={customTime}
                onChange={(e) => {
                  setCustomTime(e.target.value);
                  setSelectedTrainerId(trainer.id);
                  setSelectedTimes({ [trainer.id]: "" });
                }}
              />
            </div>
          ))}

          <button className="pt-next-btn" onClick={nextStep1}>
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h1 className="pt-title">Select Plan & Details</h1>

          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pt-plan-card ${selectedPlan.id === plan.id ? "selected" : ""}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h2>{plan.name}</h2>
              <p className="pt-plan-price">₹{plan.price}</p>
              <p className="pt-plan-sub">{plan.subtitle}</p>
            </div>
          ))}

          <input
            className="pt-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="pt-input"
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="pt-input"
            placeholder="WhatsApp Number"
            value={contact}
            onChange={(e) => validatePhone(e.target.value)}
          />
          {phoneError && <p className="pt-error">{phoneError}</p>}

          <p className="pt-days-label">Preferred Days</p>

          <div className="pt-days-grid">
            {DAYS.map((day) => (
              <button
                key={day}
                className={`pt-day-btn ${selectedDays.includes(day) ? "selected" : ""}`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <textarea
            className="pt-textarea"
            placeholder="Any notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="pt-next-btn" onClick={nextStep2}>
            Next
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <h1 className="pt-title">Confirm & Book</h1>

          <div className="pt-summary">
            <p><b>Trainer:</b> {selectedTrainer?.name}</p>
            <p><b>Time:</b> {customTime || selectedTimes[selectedTrainerId]}</p>
            <p><b>Plan:</b> {selectedPlan.name} — ₹{selectedPlan.price}</p>
            <p><b>Days:</b> {selectedDays.join(", ")}</p>
            {notes && <p><b>Notes:</b> {notes}</p>}
          </div>

          <button className="pt-submit-btn" disabled={submitting} onClick={handleSubmit}>
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}
