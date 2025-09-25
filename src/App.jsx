import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLogin from "./pages/auth/UserLogin";
import UserRegistration from "./pages/auth/UserRegistration";
import FoodPartnerLogin from "./pages/auth/FoodPartnerLogin";
import FoodPartnerRegistration from "./pages/auth/FoodPartnerRegistration";
import Profile from "./pages/food-partner/profile";
import Saved from "./pages/general/Saved";

import Home from "./pages/general/Home";

import CreateFood from "./pages/food-partner/CreateFood";
import Hero from "./pages/general/Hero";
import UserProtectedRouter from "./pages/auth/UserProtectedRouter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegistration />} />
        {/* <Route path="/reels" element={<Home />} /> */}
        
        <Route element={<UserProtectedRouter />}>
          <Route path="/reels" element={<Home />} />
          {/* Add other protected routes here */}
        </Route>

        <Route path="/partner/login" element={<FoodPartnerLogin />} />
        <Route path="/partner/register" element={<FoodPartnerRegistration />} />

        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<Profile />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
};

export default App;
