import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { StoryModel } from "./models/StoryModel";
import axios from "axios";
import { PlotModel } from "./models/PlotModel";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:language" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:language/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
