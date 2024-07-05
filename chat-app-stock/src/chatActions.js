export const SET_CHAT_OPTION = 'SET_CHAT_OPTION';

export const setChatOption = (option) => ({
  type: SET_CHAT_OPTION,
  payload: option,
});

export const setTheme = (theme) => ({
  type: 'SET_THEME',
  payload: theme
});