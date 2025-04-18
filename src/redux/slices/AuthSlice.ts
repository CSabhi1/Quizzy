/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	auth,
	provider,
	signInWithPopup,
	signOut,
	User,
} from "@app/firebase/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";

interface AuthState {
	user: Partial<User> | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: JSON.parse(localStorage.getItem("user") || "null"), // Load user from localStorage
	loading: false,
	error: null,
};

// Async actions
export const signInWithGoogle = createAsyncThunk(
	"auth/signInWithGoogle",
	async (_, { rejectWithValue }) => {
		try {
			const result = await signInWithPopup(auth, provider);
			localStorage.setItem("user", JSON.stringify(result.user)); // Save user to localStorage
			return result.user;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const signInWithEmail = createAsyncThunk(
	"auth/signInWithEmail",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			const userData = {
				uid: user.uid,
				email: user.email,
				username: user.displayName,
			};
			localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user in localStorage

			return userData;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const signUpWithEmail = createAsyncThunk(
	"auth/signUpWithEmail",
	async (
		{
			email,
			password,
			username,
		}: { email: string; password: string; username: string },
		{ rejectWithValue }
	) => {
		try {
			// Create user
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log(user);

			// Update user's profile with username
			await updateProfile(user, { displayName: username });

			const userData = { uid: user.uid, email: user.email, username };
			localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store user in localStorage

			return userData;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const signOutUser = createAsyncThunk(
	"auth/signOut",
	async (_, { rejectWithValue }) => {
		try {
			await signOut(auth);
			console.log("hi");
			localStorage.removeItem("user"); // Remove user from localStorage
			return null;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

// Slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.loading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			//Sign in with google
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				signInWithGoogle.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.user = action.payload;
					state.loading = false;
				}
			)
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			//Sign in with email
			.addCase(signInWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signInWithEmail.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(signInWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			//Sign up with email
			.addCase(signUpWithEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signUpWithEmail.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loading = false;
			})
			.addCase(signUpWithEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			.addCase(signOutUser.fulfilled, (state) => {
				state.user = null;
				state.loading = false;
			})
			.addCase(signOutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
