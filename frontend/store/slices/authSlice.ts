import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiCall } from "@/services/api";
import type { LoginUserInput, RegisterUserInput } from "@/services/auth";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk to hydrate auth state from localStorage and fetch current user
export const hydrateAuth = createAsyncThunk(
  "auth/hydrateAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return null;
      }

      // Fetch current user from backend
      const response = await apiCall.get("/users/current");
      return {
        user: response.data.data,
        token: token,
      };
    } catch (error: any) {
      // Token might be expired or invalid
      localStorage.removeItem("accessToken");
      return rejectWithValue("Failed to hydrate auth");
    }
  }
);

// Async thunk for login
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (formData: LoginUserInput, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("/users/login", formData);
      const { accessToken, user } = response.data.data;

      if (!accessToken) {
        return rejectWithValue("No access token in response");
      }

      localStorage.setItem("accessToken", accessToken);

      return {
        user,
        token: accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Async thunk for register
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (formData: RegisterUserInput, { rejectWithValue }) => {
    try {
      const response = await apiCall.post("/users/register", formData);
      const { accessToken, user } = response.data.data;

      if (!accessToken) {
        return rejectWithValue("No access token in response");
      }

      localStorage.setItem("accessToken", accessToken);

      return {
        user,
        token: accessToken,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Hydrate auth
      .addCase(hydrateAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      // Login user
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register user
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setToken, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
