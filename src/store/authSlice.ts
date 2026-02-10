import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    uid: string;
    email: string | null;
    role: string | null;
  } | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true, // Start as true to wait for Firebase to check the session
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;