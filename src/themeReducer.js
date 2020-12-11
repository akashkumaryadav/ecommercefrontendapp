export default (state, action) => {
  switch (action.type) {
    case "SET_DARK":
      return "dark";
    case "SET_LIGHT":
      return "light";
    default:
      return state;
  }
};
