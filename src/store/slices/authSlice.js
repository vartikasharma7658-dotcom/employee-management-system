import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('auth_user')) || null,
  isAuthenticated: !!localStorage.getItem('auth_user'),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password, employees } = action.payload;
      // Mock validation
      const user = employees.find(emp => emp.email === email);
      if (user && password === 'password123') { // Simple mock password
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('auth_user', JSON.stringify(user));
      } else {
        state.error = 'Invalid email or password';
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
