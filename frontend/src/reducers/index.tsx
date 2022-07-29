import { combineReducers } from "redux";
import loginReducers from "./login";

const AllReducers = combineReducers({
  login: loginReducers,
});

export default AllReducers;
