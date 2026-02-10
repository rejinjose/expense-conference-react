import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import deviceSlice from './deviceSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        devices: deviceSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;