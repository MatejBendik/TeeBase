import { combineReducers } from "redux";
import auth from "./auth";
//import loginReducers from "./login";

/*
const AllReducers = combineReducers({
  login: loginReducers,
});
*/

//export default AllReducers;

export default combineReducers({ auth });
