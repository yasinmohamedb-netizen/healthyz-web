import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomeScreen from "./screens/Home/HomeScreen";
import ExploreScreen from "./screens/Explore/ExploreScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-6 px-6">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/explore" element={<ExploreScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
