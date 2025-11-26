// config.js

// Your backend base URL
export const BASE_URL = "https://healthyz-backend.onrender.com/api";

// Simple reusable API helper
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    // If the API sends non-JSON, avoid crashing
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }

  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
