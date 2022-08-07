const contentReducer = (state = "home", action) => {
  switch (action.type) {
    case "SET_SCREEN_CONTENT":
      return action.payload;

    default:
      return state;
  }
};
export default contentReducer;
