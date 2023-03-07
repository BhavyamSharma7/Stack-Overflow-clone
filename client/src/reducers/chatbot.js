const chatbot = (state = { visible: false }, action) => {
  switch (action.type) {
    case "TOGGLE_CHATBOT":
      return { visible: action.payload };
    default:
      return state;
  }
};

export default chatbot;
