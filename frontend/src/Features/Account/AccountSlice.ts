import { createSlice } from '@reduxjs/toolkit';
import { Account } from '../../Models/PanGoldenModels';

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        id: '',
        name: '',
        untrackedBalance: '',
        balance: '',
    },
    reducers: {
        setAccount: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.untrackedBalance = action.payload.untrackedBalance;
        },
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        clearAccount: (state) => {
            state.id = '';
            state.name = '';
            state.untrackedBalance = '';
            state.balance = '';
        }
    }
});

export const { setAccount, setBalance, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;