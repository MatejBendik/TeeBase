import contentReducer from "./contentReducer";
import getUserReducer from "./getUserReducer";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  contentScreen: contentReducer,
  userData: getUserReducer,
});

export default AllReducers;
