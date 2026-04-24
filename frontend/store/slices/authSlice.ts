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
        console.log("ℹ️ No token in localStorage, skipping hydration");
        return null;
      }

      console.log("📤 Hydrating auth - fetching current user...");
      // Fetch current user from backend
      const response = await apiCall.get("/users/current");
      console.log("✅ Hydration successful:", response.data.data);
      return {
        user: response.data.data,
        token: token,
      };
    } catch (error: any) {
      console.error("❌ Hydration failed:", error);
      
      // Only clear token on 401 (unauthorized/expired) or 403 (forbidden)
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        console.log("🔑 Token expired or invalid, clearing...");
        localStorage.removeItem("accessToken");
        return rejectWithValue("Token expired");
      }
      
      // For other errors (like endpoint not found), keep the token
      // The interceptor will still send it for other requests
      console.log("⚠️ Hydration failed but keeping token (might be endpoint issue)");
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        return {
          user: null,
          token: storedToken,
        };
      }
      
      return rejectWithValue("Failed to hydrate auth");
    }
  }
);

// Async thunk for login
export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (formData: LoginUserInput, { rejectWithValue }) => {
    try {
      console.log("📤 Attempting login with:", formData);
      const response = await apiCall.post("/users/login", formData);
      console.log("✅ Login response:", response.data);
      
      const { accessToken, user } = response.data.data;

      if (!accessToken) {
        console.error("❌ No access token in response");
        return rejectWithValue("No access token in response");
      }

      localStorage.setItem("accessToken", accessToken);
      console.log("✅ Token saved to localStorage");

      return {
        user,
        token: accessToken,
      };
    } catch (error: any) {
      console.error("❌ Login error:", error);
      console.error("❌ Error response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// Async thunk for register
export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",
  async (formData: RegisterUserInput, { rejectWithValue }) => {
    try {
      console.log("📤 Attempting registration with:", formData);
      const response = await apiCall.post("/users/register", formData);
      console.log("✅ Registration response:", response.data);
      
      const { accessToken, user } = response.data.data;

      if (!accessToken) {
        console.error("❌ No access token in response");
        return rejectWithValue("No access token in response");
      }

      localStorage.setItem("accessToken", accessToken);
      console.log("✅ Token saved to localStorage");

      return {
        user,
        token: accessToken,
      };
    } catch (error: any) {
      console.error("❌ Registration error:", error);
      console.error("❌ Error response:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
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
