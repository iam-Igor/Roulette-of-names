const initialState = {
  darkModeEnabled: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ENABLE_DARK_MODE":
      return {
        ...state,
        darkModeEnabled: action.payload,
      };
    default:
      return state;
  }
};
export { mainReducer };
