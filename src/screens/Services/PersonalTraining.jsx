// src/screens/Services/PersonalTraining.jsx
import React, { useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BASE_URL } from "../../context/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./PersonalTraining.css";

const TRAINERS = [
  {
    id: "raj",
    name: "Raj Mehta",
    specialty: "Strength & Conditioning",
    image:
      "https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#F29100",
    times: ["6:00 AM", "7:00 AM", "6:00 PM", "7:00 PM"],
  },
  {
    id: "nisha",
    name: "Nisha Kapoor",
    specialty: "Weight Loss & HIIT",
    image:
      "https://images.pexels.com/photos/3763871/pexels-photo-3763871.jpeg?auto=compress&cs=tinysrgb&w=600",
    accent: "#F29100",
    times: ["7:00 AM", "8:00 AM", "5:00 PM", "6:00 PM"],
  },
];

const PLANS = [
  { id: "single", name: "Single Session", price: 500, subtitle: "1x 60 min" },
  { id: "weekly", name: "Weekly Pack", price: 1500, subtitle: "7x 60 min" },
  { id: "monthly", name: "Monthly Pack", price: 6000, subtitle: "Unlimited classes" },
];

const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function PersonalTraining() {
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

  // Get Firebase User (But DO NOT redirect)
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

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const validatePhone = (text) => {
    let formatted = text.replace(/[\s-]/g, "");

    if (formatted.startsWith("0")) formatted = formatted.slice(1);
    if (!formatted.startsWith("+91") && formatted.length <= 10) {
      formatted = "+91" + formatted;
    }

    setContact(formatted);

    const validRegex = /^\+91[6-9]\d{9}$/;
    setPhoneError(validRegex.test(formatted) ? "" : "Invalid WhatsApp number");
  };

  // STEP 1 → STEP 2
  const goNextFromStep1 = () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!selectedTrainerId || (!selectedTimes[selectedTrainerId] && !customTime)) {
      alert("Select trainer & time");
      return;
    }

    setStep(2);
  };

  // STEP 2 → STEP 3
  const goNextFromStep2 = () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!name.trim() || !age.trim() || !contact.trim()) {
      alert("Fill all details");
      return;
    }
    if (phoneError) return alert("Invalid phone");

    setStep(3);
  };

  // FINAL SUBMIT
  const handleSubmit = async () => {
    // 🔥 LOGIN CHECK
    if (!auth.currentUser) {
      navigate("/login", { state: { from: location } });
      return;
    }

    const chosenTime = customTime || selectedTimes[selectedTrainerId];

    try {
      setSubmitting(true);

      const data = {
        userId,
        userName: name,
        userMobile: contact,
        serviceName: "Personal Training",
        trainerName: selectedTrainer?.name,
        trainerId: selectedTrainerId,
        days: selectedDays,
        timeSlot: chosenTime,
        plan: selectedPlan,
        notes,
      };

      const res = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      alert("Booking successful!");
      navigate("/bookings");
    } catch (err) {
      alert("Error booking, try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-wrapper">
      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h1 className="pt-title">Choose Your Trainer & Time</h1>

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

          <button className="pt-next-btn" onClick={goNextFromStep1}>
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h1 className="pt-title">Select Plan & Fill Details</h1>

          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pt-plan-card ${
                selectedPlan.id === plan.id ? "selected" : ""
              }`}
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
            type="number"
            placeholder="Age"
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
            {DAY_OPTIONS.map((day) => (
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
            rows={3}
            className="pt-textarea"
            placeholder="Any notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="pt-next-btn" onClick={goNextFromStep2}>
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

          <button
            className="pt-submit-btn"
            disabled={submitting}
            onClick={handleSubmit}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}
