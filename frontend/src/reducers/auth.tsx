/*
const loginReducers = (data = [], action: any) => {
  switch (action.type) {
    case "LOGIN":
      return [...data, action.payload];

    default:
      return data;
  }
};
export default loginReducers;

*/
import { AUTH, LOGOUT } from '../const/actionTypes';

const authReducer = (state = { authData: null }, action: any) => {
  switch(action.type){
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

      // docs ku ?. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default: 
      return state;
  }
}

export default authReducer;