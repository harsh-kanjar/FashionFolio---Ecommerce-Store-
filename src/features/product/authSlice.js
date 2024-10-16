import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = 'https://server-1-ftit.onrender.com/';

// Create action for fetching user (login)
export const fetchUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            alert("Logged in successfully",json.authToken);
        } else {
            alert("Invalid credentials");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Create action for user signup
export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${host}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Internal server error');
        }
        return result; // Return user data or success message
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    user: null, // Change to null to represent no user logged in
    loading: true,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null; // Reset the error state
        },
        logout: (state) => {
            state.user = null; // Clear user data on logout
        },
    },
    extraReducers: (builder) => {
        // Handle login actions
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true; // Set loading to true
                state.error = null; // Reset error state
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false
                state.user = action.payload; // Store user data
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false; // Set loading to false
                state.error = action.payload; // Store error message
            })
            // Handle signup actions
            .addCase(signupUser.pending, (state) => {
                state.loading = true; // Set loading to true
                state.error = null; // Reset error state
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false
                state.user = action.payload; // Store user data
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false; // Set loading to false
                state.error = action.payload; // Store error message
            });
    },
});

// Export actions and reducer
export const { resetError, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
