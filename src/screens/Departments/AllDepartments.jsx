import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdMedicalServices } from "react-icons/md";
import * as Icons from "react-icons/md";

export default function AllDepartments() {
  const navigate = useNavigate();
  const location = useLocation();

  const { departments = [] } = location.state || {};

  const renderIcon = (iconName, color) => {
    const IconComponent = Icons[iconName] || MdMedicalServices;
    return <IconComponent size={28} color={color} />;
  };

  return (
    <>
      <style>{`
        .departments-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .departments-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .departments-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div className="min-h-screen bg-white p-5 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">All Departments</h1>

        <div className="departments-grid">
          {departments.map((item) => (
            <button
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition border"
              onClick={() =>
                navigate("/department-details", {
                  state: { departmentId: item.id },
                })
              }
              style={{ cursor: "pointer" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}22` }}
              >
                {renderIcon(item.icon, item.color)}
              </div>

              <p className="text-gray-800 text-sm font-semibold">{item.name}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
