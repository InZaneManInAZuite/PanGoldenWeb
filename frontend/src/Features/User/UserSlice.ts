import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    firstName: '',
    lastName: '',
    id: '',
    loggedIn: false,
  },
  reducers: {
    clearUser: (state) => {
      state.username = '';
      state.firstName = '';
      state.lastName = '';
      state.id = '';
      state.loggedIn = false;
    },
    setUser: (state, action) => {
      if (action.payload.username !== undefined) state.username = action.payload.username;
      if (action.payload.firstName !== undefined) state.firstName = action.payload.firstName;
      if (action.payload.lastName !== undefined) state.lastName = action.payload.lastName;
      if (action.payload.id !== undefined) state.id = action.payload.id;
      state.loggedIn = true;
    },
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
