const initialState = {
  chatOption: 'company_manual',
  theme: 'light'
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHAT_OPTION':
      return { ...state, chatOption: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default chatReducer;