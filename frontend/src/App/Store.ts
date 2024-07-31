import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from '../Features/User/UserSlice';
import pageReducer from '../Features/Page/PageSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    user: userReducer,
    page: pageReducer
}));

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);