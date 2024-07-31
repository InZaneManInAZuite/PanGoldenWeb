import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        id: undefined,
        loggedIn: false
    },
    reducers: {
        clearUser: (state) => {
            state.username = undefined;
            state.firstName = undefined;
            state.lastName = undefined;
            state.id = undefined;
            state.loggedIn = false;
        },
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.id = action.payload.id;
            state.loggedIn = true;
        }
    }
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;