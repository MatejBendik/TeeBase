const getUserReducer = (state = [], action: any) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return action.payload;

    default:
      return state;
  }
};
export default getUserReducer;
