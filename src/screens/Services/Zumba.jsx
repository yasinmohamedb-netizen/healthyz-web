// src/screens/Services/Zumba.jsx
import React, { useMemo, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./Zumba.css";

const TRAINERS = [
  {
    id: "rahul",
    name: "Rahul Singh",
    specialty: "Zumba & Dance Fitness",
    image:
      "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#F29100",
    times: ["6:00 AM", "7:00 AM", "6:00 PM", "7:00 PM"],
  },
  {
    id: "neha",
    name: "Neha Sharma",
    specialty: "Cardio Zumba",
    image:
      "https://images.pexels.com/photos/3831649/pexels-photo-3831649.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#439BAE",
    times: ["7:00 AM", "8:00 AM", "5:00 PM", "6:00 PM"],
  },
];

const PLANS = [
  { id: "single", name: "Single Session", price: 500, subtitle: "1× 60 min" },
  { id: "weekly", name: "Weekly Pack", price: 1500, subtitle: "7× 60 min" },
  { id: "monthly", name: "Monthly Pack", price: 6000, subtitle: "Unlimited classes" }
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Zumba() {
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Track login but do not block
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });
  }, []);

  const selectedTrainer = useMemo(
    () => TRAINERS.find((t) => t.id === selectedTrainerId),
    [selectedTrainerId]
  );

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const validatePhone = (text) => {
    let f = text.replace(/[\s-]/g, "");
    if (f.startsWith("0")) f = f.slice(1);
    if (!f.startsWith("+91") && f.length <= 10) f = "+91" + f;
    setContact(f);
    setPhoneError(/^\+91[6-9]\d{9}$/.test(f) ? "" : "Invalid WhatsApp number");
  };

  const next1 = () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!selectedTrainerId || (!selectedTimes[selectedTrainerId] && !customTime)) {
      alert("Please choose a trainer and time.");
      return;
    }
    setStep(2);
  };

  const next2 = () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!name || !age || !contact || phoneError) {
      alert("Please fill valid details.");
      return;
    }
    setStep(3);
  };

  const handleSubmit = async () => {
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const timeSlot = customTime || selectedTimes[selectedTrainerId];

    const bookingData = {
      type: "training",
      userId,
      userName: name,
      userMobile: contact,
      age,
      days: selectedDays,
      serviceName: "Zumba Training",
      trainerName: selectedTrainer?.name,
      trainerId: selectedTrainerId,
      timeSlot,
      plan: selectedPlan,
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      alert("Zumba session booked successfully!");
      navigate("/bookings");
    } catch (err) {
      alert("Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="zum-wrapper">

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h1 className="zum-title">Choose Your Trainer & Time</h1>

          {TRAINERS.map((t) => (
            <div key={t.id} className="zum-card">
              <img src={t.image} className="zum-img" alt={t.name} />

              <h3 className="zum-name" style={{ color: t.accent }}>
                {t.name}
              </h3>
              <p className="zum-special">{t.specialty}</p>

              <div className="zum-times">
                {t.times.map((time) => {
                  const active =
                    selectedTrainerId === t.id &&
                    selectedTimes[t.id] === time;

                  return (
                    <button
                      key={time}
                      className={`zum-time-btn ${active ? "active" : ""}`}
                      style={{
                        backgroundColor: active ? t.accent : "",
                        borderColor: active ? t.accent : "#ccc",
                      }}
                      onClick={() => {
                        setSelectedTrainerId(t.id);
                        setSelectedTimes({ [t.id]: time });
                        setCustomTime("");
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>

              <input
                className="zum-input"
                placeholder="Or enter preferred time"
                value={customTime}
                onChange={(e) => {
                  setCustomTime(e.target.value);
                  setSelectedTrainerId(t.id);
                  setSelectedTimes({ [t.id]: "" });
                }}
              />
            </div>
          ))}

          <button className="zum-next" onClick={next1}>
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h1 className="zum-title">Select Plan & Your Details</h1>

          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`zum-plan ${selectedPlan.id === p.id ? "selected" : ""}`}
              onClick={() => setSelectedPlan(p)}
            >
              <h3>{p.name}</h3>
              <p className="zum-price">₹{p.price}</p>
              <p className="zum-sub">{p.subtitle}</p>
            </div>
          ))}

          <input
            className="zum-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="zum-input"
            placeholder="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="zum-input"
            placeholder="WhatsApp Number"
            value={contact}
            onChange={(e) => validatePhone(e.target.value)}
          />
          {phoneError && <p className="zum-error">{phoneError}</p>}

          <p className="zum-days-label">Preferred Days</p>

          <div className="zum-days">
            {DAYS.map((day) => (
              <button
                key={day}
                className={`zum-day-btn ${
                  selectedDays.includes(day) ? "active" : ""
                }`}
                onClick={() => toggleDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <textarea
            className="zum-textarea"
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="zum-next" onClick={next2}>
            Next
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h1 className="zum-title">Confirm Booking</h1>

          <div className="zum-summary">
            <p><b>Trainer:</b> {selectedTrainer?.name}</p>
            <p><b>Time:</b> {customTime || selectedTimes[selectedTrainerId]}</p>
            <p><b>Plan:</b> {selectedPlan.name} — ₹{selectedPlan.price}</p>
            <p><b>Days:</b> {selectedDays.join(", ")}</p>
            <p><b>Name:</b> {name}</p>
            <p><b>Age:</b> {age}</p>
            <p><b>Contact:</b> {contact}</p>
            {notes && <p><b>Notes:</b> {notes}</p>}
          </div>

          <button
            className="zum-submit"
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
