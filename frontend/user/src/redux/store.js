import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: true,
        userId: "6710162b025ce9b398ec21d0"
    },
    reducers: {
        login(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        }
    }
})

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer,
});
