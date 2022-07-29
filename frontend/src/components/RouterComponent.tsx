import React from "react";
import Loign from "./login/Login";
import Auth from "./auth/Auth";
import Main from "./main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
