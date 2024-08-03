import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'Page',
  initialState: {
    page: '',
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearPage: (state) => {
      state.page = 'Auth';
    },
  },
});

export const { setPage, clearPage } = pageSlice.actions;
export default pageSlice.reducer;
