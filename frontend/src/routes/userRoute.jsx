import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "../pages/signupPage";
import LoginPage from "../pages/login";
import Home from "../pages/home";
import ProtectedRouteUser from "../components/protectRoute";
import Message from "../pages/Message";

export default function UserRoute() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protecting the Home route */}
        <Route
          path="/*"
          element={
            <ProtectedRouteUser>
              <Home />
             
            </ProtectedRouteUser>
          }
        />

           {/* Route for /message */}
      <Route
        path="/message/:id"
        element={
          <ProtectedRouteUser>
            <Message />
          </ProtectedRouteUser>
        }
      />
      </Routes>
    </div>
  );
}
