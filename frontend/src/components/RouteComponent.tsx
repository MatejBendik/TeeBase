import React from "react";
import Loign from "./login/Login";
import Main from "./main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loign />} />
        <Route path="/app" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
