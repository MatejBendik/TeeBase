import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/* import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import allReducers from "./reducers/index";

const store = createStore(allReducers); */

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
