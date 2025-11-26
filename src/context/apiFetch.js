import axios from "axios";
import { useCallback } from "react";

/**
 * Web Optimized API Fetch
 * - Supports online & offline mode
 * - Uses localStorage for caching
 * - Error + event logging supported
 */
export const apiFetch = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      // Cache the response
      localStorage.setItem(url, JSON.stringify(data));
  
      return data;
    } catch (err) {
      console.error("Fetch Error:", err);
  
      // Try cached version
      const cached = localStorage.getItem(url);
      return cached ? JSON.parse(cached) : null;
    }
  };
  