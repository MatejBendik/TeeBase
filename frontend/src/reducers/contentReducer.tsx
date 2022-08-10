const contentReducer = (state = "home", action: any) => {
  switch (action.type) {
    case "SET_SCREEN_CONTENT":
      return action.payload;

    default:
      return state;
  }
};
export default contentReducer;
