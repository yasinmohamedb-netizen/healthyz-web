// src/screens/Services/Yoga.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./Yoga.css";

const GURUS = [
  {
    id: "meera",
    name: "Meera",
    specialty: "Hatha & Vinyasa",
    image:
      "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#6C5CE7",
    times: ["6:00 AM", "7:00 AM", "6:00 PM"],
  },
  {
    id: "arun",
    name: "Arun",
    specialty: "Ashtanga",
    image:
      "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#00B894",
    times: ["7:00 AM", "8:00 AM", "5:00 PM"],
  },
  {
    id: "liya",
    name: "Liya",
    specialty: "Yin & Restorative",
    image:
      "https://images.pexels.com/photos/3820754/pexels-photo-3820754.jpeg?auto=compress&cs=tinysrgb&w=800",
    accent: "#E17055",
    times: ["6:00 AM", "7:00 PM"],
  },
];

const PLANS = [
  { id: "single", name: "Single Session", price: 500, subtitle: "1x 60 min" },
  { id: "weekly", name: "Weekly Pack", price: 1500, subtitle: "7x 60 min" },
  {
    id: "monthly",
    name: "Monthly Unlimited",
    price: 6000,
    subtitle: "Unlimited classes",
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Yoga() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1);

  const [selectedGuruId, setSelectedGuruId] = useState("");
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

  // Firebase auth listener (NO redirect)
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
  }, []);

  const selectedGuru = useMemo(
    () => GURUS.find((g) => g.id === selectedGuruId),
    [selectedGuruId]
  );

  // ▬▬▬▬▬ HELPER FUNCTIONS ▬▬▬▬▬
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const validatePhone = (text) => {
    let formatted = text.replace(/[\s-]/g, "");
    if (formatted.startsWith("0")) formatted = formatted.substring(1);
    if (!formatted.startsWith("+91") && formatted.length <= 10)
      formatted = "+91" + formatted;

    setContact(formatted);
    const valid = /^\+91[6-9]\d{9}$/;
    setPhoneError(valid.test(formatted) ? "" : "Invalid WhatsApp number");
  };

  // ▬▬▬▬▬ STEP 1 → STEP 2 ▬▬▬▬▬
  const next1 = () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!selectedGuruId || (!selectedTimes[selectedGuruId] && !customTime)) {
      alert("Select a Guru and time");
      return;
    }

    setStep(2);
  };

  // ▬▬▬▬▬ STEP 2 → STEP 3 ▬▬▬▬▬
  const next2 = () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!name || !age || !contact || phoneError) {
      alert("Please enter valid details");
      return;
    }

    setStep(3);
  };

  // ▬▬▬▬▬ FINAL SUBMIT ▬▬▬▬▬
  const handleSubmit = async () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const timeSlot = customTime || selectedTimes[selectedGuruId];

    const bookingData = {
      type: "training",
      userId,
      userName: name,
      userMobile: contact,
      age,
      gender: "N/A",
      address: "N/A",
      serviceName: "Yoga Training",
      days: selectedDays,
      preferredDate: new Date().toISOString(),
      timeSlot,
      plan: selectedPlan,
      notes,
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

      alert(`Yoga session booked with ${selectedGuru.name}`);
      navigate("/bookings");
    } catch {
      alert("Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ▬▬▬▬▬ UI ▬▬▬▬▬
  return (
    <div className="yoga-wrapper">

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h1 className="y-title">Choose Your Yoga Guru & Time</h1>

          {GURUS.map((guru) => (
            <div key={guru.id} className="y-card">
              <img src={guru.image} className="y-img" alt={guru.name} />

              <h3 className="y-name" style={{ color: guru.accent }}>
                {guru.name}
              </h3>
              <p className="y-special">{guru.specialty}</p>

              <div className="y-times">
                {guru.times.map((time) => {
                  const active =
                    selectedGuruId === guru.id &&
                    selectedTimes[guru.id] === time;

                  return (
                    <button
                      key={time}
                      className={`y-time-btn ${active ? "active" : ""}`}
                      style={{
                        backgroundColor: active ? guru.accent : "",
                        borderColor: active ? guru.accent : "#ccc",
                      }}
                      onClick={() => {
                        setSelectedGuruId(guru.id);
                        setSelectedTimes({ [guru.id]: time });
                        setCustomTime("");
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <input
                className="y-input"
                placeholder="Or enter your own time"
                value={customTime}
                onChange={(e) => {
                  setCustomTime(e.target.value);
                  setSelectedGuruId(guru.id);
                  setSelectedTimes({ [guru.id]: "" });
                }}
              />
            </div>
          ))}

          <button className="y-next" onClick={next1}>Next</button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h1 className="y-title">Select Plan & Details</h1>

          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`y-plan ${selectedPlan.id === plan.id ? "selected" : ""}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h3>{plan.name}</h3>
              <p className="y-price">₹{plan.price}</p>
              <p className="y-sub">{plan.subtitle}</p>
            </div>
          ))}

          <input
            className="y-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="y-input"
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="y-input"
            placeholder="WhatsApp Number"
            value={contact}
            onChange={(e) => validatePhone(e.target.value)}
          />
          {phoneError && <p className="y-error">{phoneError}</p>}

          <p className="y-days-label">Preferred Days</p>

          <div className="y-days">
            {DAYS.map((day) => (
              <button
                key={day}
                className={`y-day-btn ${selectedDays.includes(day) ? "active" : ""}`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <textarea
            className="y-textarea"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="y-next" onClick={next2}>
            Next
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h1 className="y-title">Confirm & Book</h1>

          <div className="y-summary">
            <p><b>Guru:</b> {selectedGuru?.name}</p>
            <p><b>Time:</b> {customTime || selectedTimes[selectedGuruId]}</p>
            <p><b>Plan:</b> {selectedPlan.name} — ₹{selectedPlan.price}</p>
            <p><b>Days:</b> {selectedDays.join(", ")}</p>
            <p><b>Name:</b> {name}</p>
            <p><b>Age:</b> {age}</p>
            <p><b>Contact:</b> {contact}</p>
            {notes && <p><b>Notes:</b> {notes}</p>}
          </div>

          <button
            className="y-submit"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </>
      )}
    </div>
  );
}
