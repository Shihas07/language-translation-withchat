import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
      state.isAuthenticated = true; // Set the user as authenticated
    },
    logoutAction(state) {
      state.id = null;
      state.name = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutAction } = userSlice.actions;

export default userSlice.reducer;
