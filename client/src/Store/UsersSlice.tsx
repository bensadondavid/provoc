import { createSlice } from "@reduxjs/toolkit";

interface User {
  userId: string;
  username: string;
  userEmail: string;
}

const initialState: User = {
  userId: '',
  username: '',
  userEmail: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      return { ...action.payload };
    },
    clearUser: () => {
      return { userId: '', username: '', userEmail: '' };
    }
  }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;