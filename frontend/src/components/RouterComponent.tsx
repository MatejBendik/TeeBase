import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "../screens/Auth";
import Main from "../screens/Main";

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
