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
import ReactGA from "react-ga4";
import AboutPage from "./pages/AboutPage";


function App() {
  ReactGA.initialize("G-WYNN7WS0GE");
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:language" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:language" element={<ProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/about/:language" element={<AboutPage />} />
    </Routes>
  );
}

export default App;
