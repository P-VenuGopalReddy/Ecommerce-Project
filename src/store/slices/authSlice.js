import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Mock authentication for development
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, name }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
      created_at: new Date().toISOString(),
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('mockUser', JSON.stringify(user));
    
    return user;
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'demo@example.com' && password === 'password') {
      const user = {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        role: 'user',
        created_at: '2024-01-01T00:00:00Z',
      };
      
      localStorage.setItem('mockUser', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  localStorage.removeItem('mockUser');
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
  const mockUser = localStorage.getItem('mockUser');
  return mockUser ? JSON.parse(mockUser) : null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;