import contentReducer from "./contentReducer";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  contentScreen: contentReducer,
});

export default AllReducers;
