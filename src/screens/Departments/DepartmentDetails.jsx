// src/screens/Departments/DepartmentDetails.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DepartmentDetails.css";

const departments = [
  {
    id: "1",
    name: "Gynecology",
    description: "Suffering from pain? Consult a gynecologist.",
    commonConditions: [
      "Menstrual Disorders",
      "PCOS",
      "Endometriosis",
      "Fibroids",
      "Pelvic Pain",
      "UTI",
    ],
    symptoms: [
      "Irregular periods",
      "Severe cramps",
      "Pelvic pain",
      "Abnormal discharge",
      "Fertility issues",
      "Lower abdominal pain",
    ],
    consultationExpectations:
      "Discuss medical history, pelvic exam, ultrasound recommendation and treatment plan.",
  },
  {
    id: "2",
    name: "Pediatrics",
    description: "Child specialists for all child illnesses.",
    commonConditions: ["Fever", "Cold / Cough", "Asthma", "Allergies", "Flu"],
    symptoms: ["Vomiting", "Weakness", "Cough", "Breathing issues"],
    consultationExpectations:
      "Child health evaluation, growth assessment and medication plan.",
  },
  {
    id: "3",
    name: "Cardiology",
    description: "Heart specialists for cardiac problems.",
    commonConditions: [
      "Chest Pain",
      "Blood Pressure",
      "Cholesterol",
      "Heart Palpitations",
      "Heart Block",
    ],
    symptoms: [
      "Chest discomfort",
      "Shortness of breath",
      "Dizziness",
      "Fast heartbeat",
    ],
    consultationExpectations:
      "ECG review, vitals check, lifestyle guidance and treatment options.",
  },
  {
    id: "4",
    name: "Orthopedics",
    description: "Bone, joint and muscle specialists.",
    commonConditions: [
      "Knee Pain",
      "Back Pain",
      "Arthritis",
      "Fractures",
      "Ligament Tears",
    ],
    symptoms: ["Joint stiffness", "Swelling", "Limited movement", "Pain"],
    consultationExpectations:
      "Physical assessment, mobility test, X-ray/MRI suggestions.",
  },
  {
    id: "5",
    name: "Dermatology",
    description: "Skin, hair and nail specialists.",
    commonConditions: ["Acne", "Eczema", "Psoriasis", "Hair fall", "Rashes"],
    symptoms: [
      "Itching",
      "Redness",
      "Skin patches",
      "Hair thinning",
      "Pigmentation",
    ],
    consultationExpectations:
      "Skin analysis, medication plan, lifestyle guidance.",
  },
  {
    id: "6",
    name: "Neurology",
    description: "Brain & nerve specialists.",
    commonConditions: [
      "Migraine",
      "Seizures",
      "Stroke recovery",
      "Nerve weakness",
      "Parkinson's",
    ],
    symptoms: [
      "Headache",
      "Numbness",
      "Tremors",
      "Dizziness",
      "Memory issues",
    ],
    consultationExpectations:
      "Neurological exam, MRI/Scan advice, medication and rehabilitation plan.",
  },
  {
    id: "7",
    name: "ENT",
    description: "Ear, nose & throat specialists.",
    commonConditions: [
      "Ear pain",
      "Sinusitis",
      "Tonsillitis",
      "Throat infection",
      "Allergic rhinitis",
    ],
    symptoms: [
      "Blocked nose",
      "Ear discharge",
      "Throat irritation",
      "Cough",
    ],
    consultationExpectations:
      "ENT exam, nasal check, throat evaluation and treatment.",
  },
  {
    id: "8",
    name: "Gastroenterology",
    description: "Stomach and digestive health specialists.",
    commonConditions: [
      "Acidity",
      "IBS",
      "Gas/Bloating",
      "Liver issues",
      "Constipation",
    ],
    symptoms: [
      "Abdominal pain",
      "Nausea",
      "Heartburn",
      "Loose motion",
      "Loss of appetite",
    ],
    consultationExpectations:
      "Abdominal review, diet plan, medication, and lifestyle advice.",
  },
  {
    id: "9",
    name: "Urology",
    description: "Kidney, bladder & urinary specialists.",
    commonConditions: [
      "Kidney stones",
      "UTI",
      "Prostate issues",
      "Urine infection",
    ],
    symptoms: [
      "Burning urination",
      "Frequent urination",
      "Back pain",
      "Blood in urine",
    ],
    consultationExpectations:
      "Urine test review, ultrasound guidance, medication plan.",
  },
  {
    id: "10",
    name: "General Medicine",
    description: "Consult for fever, infection, weakness & common illnesses.",
    commonConditions: [
      "Fever",
      "Body pain",
      "Thyroid issues",
      "Viral infection",
      "Diabetes",
    ],
    symptoms: ["Fatigue", "Cough", "Cold", "Weakness"],
    consultationExpectations:
      "Vitals check, symptom-based evaluation, lab test guidance.",
  },
];

export default function DepartmentDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { departmentId } = location.state || {};

  const department = departments.find((d) => d.id === departmentId);

  if (!department) {
    return (
      <div className="dept-not-found">
        <h1>Department Not Found</h1>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="dept-page">
      <div className="dept-card">

        {/* HEADER */}
        <h1 className="dept-title">{department.name}</h1>
        <p className="dept-subtitle">Specialist Consultation</p>

        {/* DESCRIPTION */}
        <p className="dept-description">{department.description}</p>

        {/* COMMON CONDITIONS */}
        <div className="dept-section">
          <h2>Common Conditions</h2>
          <div className="tag-container">
            {department.commonConditions.map((c, i) => (
              <span key={i} className="tag">{c}</span>
            ))}
          </div>
        </div>

        {/* SYMPTOMS */}
        <div className="dept-section">
          <h2>Symptoms</h2>
          <div>
            {department.symptoms.map((s, i) => (
              <div key={i} className="bullet">
                <span className="dot"></span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EXPECTATIONS */}
        <div className="expect-box">
          <p>{department.consultationExpectations}</p>
        </div>

        {/* CTA BUTTON */}
        <button
          className="consult-btn"
          onClick={() => navigate("/video-consultation")}
        >
          ➤ Book Consultation
        </button>

      </div>
    </div>
  );
}
