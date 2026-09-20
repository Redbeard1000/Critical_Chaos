import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ChatState {
  messages: string[];
}

const initialState: ChatState = {
  messages: [],
};

const chatLog = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatLog.actions;
export const selectMessages = (state: RootState) => state.chat.messages;

export default chatLog.reducer;
