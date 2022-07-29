const loginReducers = (data = [], action: any) => {
  switch (action.type) {
    case "LOGIN":
      return [...data, action.payload];

    default:
      return data;
  }
};
export default loginReducers;
