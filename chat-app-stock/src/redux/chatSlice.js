// src/redux/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    chatOption: 'company_manual',
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatOption: (state, action) => {
      state.chatOption = action.payload;
    },
  },
});

export const { addMessage, setChatOption } = chatSlice.actions;
export default chatSlice.reducer;