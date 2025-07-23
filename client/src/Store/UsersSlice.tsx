import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

const initialState: User[] = [];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload); 
    },
    clearUser: () => {
      return [];
    }
  }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;