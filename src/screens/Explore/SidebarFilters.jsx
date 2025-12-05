import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  discount,
  setDiscount,
  sort,
  setSort,
}) {
  const navigate = useNavigate();
  const [openMobileFilter, setOpenMobileFilter] = useState(false);

  const handleCategoryClick = (id) => {
    const routes = {
      all: "/explore",       // ⭐ NEW → All Products navigation
      fitness: "/gym",
      gym: "/gym",
      beauty: "/beauty",
      sexual: "/sexual",
      baby: "/babycare",
      babycare: "/babycare",
      // medicines: "/medicines",
      // surgical: "/surgical",
    };

    if (routes[id]) return navigate(routes[id]);
    setSelectedCategory(id);
  };

  return (
    <>
      <style>{`
        /***********************
         DESKTOP SIDEBAR
        ************************/
        .sidebarBox {
          width: 240px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          position: sticky;
          top: 100px;
          height: max-content;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .sidebarBox {
            display: none;
          }
        }

        /***********************
         COMMON STYLES
        ************************/
        .filterTitle {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .categoryBtn {
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          font-size: 14px;
          border-radius: 8px;
          border: none;
          background: #fff;
          cursor: pointer;
        }

        .categoryBtn:hover {
          background: #f3f4f6;
        }

        .categoryActive {
          background: #e0edff;
          color: #2563eb;
          font-weight: 600;
        }

        .priceInput {
          width: 100%;
        }

        .discountRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #374151;
        }

        .sortSelect {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        /***********************
         MOBILE BUTTON
        ************************/
        @media (max-width: 900px) {
          .mobileFilterBtn {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #0d9488; 
            color: white;
            padding: 14px 32px;
            font-size: 16px;
            border-radius: 30px;
            border: none;
            z-index: 9999;
            width: 90%;
            max-width: 380px;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 6px 20px rgba(0,0,0,0.18);
          }
        }

        /***********************
         MOBILE DRAWER
        ************************/
        .mobileFilterDrawer {
          display: none;
        }

        @media (max-width: 900px) {
          .mobileFilterDrawer {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 75%;
            background: #fff;
            z-index: 99999;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0 -6px 20px rgba(0,0,0,0.2);
            padding: 20px;
            overflow-y: auto;
            transform: translateY(100%);
            transition: transform 0.35s ease-in-out;
          }

          .mobileFilterDrawer.open {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* DESKTOP SIDEBAR */}
      <aside className="sidebarBox">
        {/* Categories */}
        <div>
          <h3 className="filterTitle">Categories</h3>

          {/* ⭐ ADD ALL PRODUCTS BUTTON */}
          <button
            className={`categoryBtn ${selectedCategory === "all" ? "categoryActive" : ""}`}
            onClick={() => handleCategoryClick("all")}
          >
            All Products
          </button>

          {/* Existing categories */}
          {categories.map((c) => (
            <button
              key={c.id}
              className={`categoryBtn ${selectedCategory === c.id ? "categoryActive" : ""}`}
              onClick={() => handleCategoryClick(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Price */}
        <div>
          <h3 className="filterTitle">Price Range</h3>
          <input
            type="range"
            min="0"
            max="2000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="priceInput"
          />
          <p>Up to ₹{priceRange}</p>
        </div>

        {/* Discount */}
        <div>
          <h3 className="filterTitle">Discount</h3>
          {[10, 20, 30].map((d) => (
            <label key={d} className="discountRow">
              <input
                type="checkbox"
                checked={discount.includes(d)}
                onChange={() =>
                  setDiscount((prev) =>
                    prev.includes(d)
                      ? prev.filter((x) => x !== d)
                      : [...prev, d]
                  )
                }
              />
              {d}% or more
            </label>
          ))}
        </div>

        {/* Sort */}
        <div>
          <h3 className="filterTitle">Sort By</h3>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="sortSelect"
          >
            <option value="">Default</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>
      </aside>

      {/* MOBILE FILTER BUTTON */}
      <button
        className="mobileFilterBtn"
        onClick={() => setOpenMobileFilter(true)}
      >
        Filters
      </button>

      {/* MOBILE DRAWER */}
      <div className={`mobileFilterDrawer ${openMobileFilter ? "open" : ""}`}>
        <button
          style={{
            fontSize: 22,
            position: "absolute",
            right: 20,
            top: 20,
            background: "none",
            border: "none",
          }}
          onClick={() => setOpenMobileFilter(false)}
        >
          ✕
        </button>

        <h3 className="filterTitle" style={{ marginTop: 40 }}>Filters</h3>

        {/* MOBILE CATEGORIES */}
        <div>
          <h3 className="filterTitle">Categories</h3>

          {/* ⭐ ADD ALL PRODUCTS MOBILE */}
          <button
            className={`categoryBtn ${selectedCategory === "all" ? "categoryActive" : ""}`}
            onClick={() => {
              handleCategoryClick("all");
              setOpenMobileFilter(false);
            }}
          >
            All Products
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              className={`categoryBtn ${selectedCategory === c.id ? "categoryActive" : ""}`}
              onClick={() => {
                handleCategoryClick(c.id);
                setOpenMobileFilter(false);
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Other filters unchanged */}
      </div>
    </>
  );
}
