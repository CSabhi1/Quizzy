/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	collection,
	addDoc,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	Timestamp,
	query,
	where,
	getDoc,
} from "firebase/firestore";
import { db } from "@app/firebase/firebase";

export interface Question {
	id: string;
	question: string;
	answerChoices: string[];
	correctAnswer: string;
	tags?: string[];
	createdAt?: Timestamp;
	createdBy: string;
	difficulty: string;
}

interface QuestionsState {
	questions: { totalCount: number; data: Question[] };
	loading: boolean;
	error: string | null;
}

const initialState: QuestionsState = {
	questions: { totalCount: 0, data: [] },
	loading: false,
	error: null,
};

// 🔄 Async thunks

export const fetchQuestions = createAsyncThunk(
	"questions/fetchQuestions",
	async (
		{
			page = 1,
			pageSize = 10,
			searchField,
			searchText,
			sortField,
			sortOrder = "asc",
			userId,
		}: {
			page?: number;
			pageSize?: number;
			searchField?: string;
			searchText?: string;
			sortField?: string;
			sortOrder?: "asc" | "desc";
			userId: string; // 🔑 Add this
		},
		{ rejectWithValue }
	) => {
		try {
			const snapshot = await getDocs(
				query(collection(db, "questions"), where("createdBy", "==", userId))
			);

			let allQuestions: Question[] = snapshot.docs
				.map((docSnap) => ({
					id: docSnap.id,
					...docSnap.data(),
				}))
				.filter((q) => (q as any).createdBy === userId) as Question[]; // 🔒 Only user’s questions

			// Filter
			if (searchField && searchText) {
				allQuestions = allQuestions.filter((q) => {
					const value = (q as Record<string, any>)[searchField];

					if (typeof value === "string") {
						return value.toLowerCase().includes(searchText.toLowerCase());
					}

					if (Array.isArray(value)) {
						return value.some((v) =>
							v.toLowerCase().includes(searchText.toLowerCase())
						);
					}

					return false;
				});
			}

			// 🔃 Sort
			allQuestions.sort((a, b) => {
				const field = sortField || "createdAt";
				const aVal = (a as Record<string, any>)[field];
				const bVal = (b as Record<string, any>)[field];
				const order = sortField ? sortOrder : "desc";

				if (aVal === undefined || bVal === undefined) return 0;

				if (typeof aVal === "string" && typeof bVal === "string") {
					return order === "asc"
						? aVal.localeCompare(bVal)
						: bVal.localeCompare(aVal);
				}

				if (typeof aVal === "number" && typeof bVal === "number") {
					return order === "asc" ? aVal - bVal : bVal - aVal;
				}

				if (aVal instanceof Timestamp && bVal instanceof Timestamp) {
					return order === "asc"
						? aVal.toMillis() - bVal.toMillis()
						: bVal.toMillis() - aVal.toMillis();
				}

				return 0;
			});

			// 📃 Paginate
			const totalCount = allQuestions.length;
			const start = (page - 1) * pageSize;
			const paginatedQuestions = allQuestions.slice(start, start + pageSize);

			return {
				data: paginatedQuestions,
				totalCount,
			};
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const createQuestion = createAsyncThunk(
	"questions/createQuestion",
	async (questionData: Omit<Question, "id">, { rejectWithValue }) => {
		try {
			const docRef = await addDoc(collection(db, "questions"), {
				...questionData,
				createdAt: Timestamp.now(),
			});
			return { id: docRef.id, ...questionData };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchQuestionById = createAsyncThunk(
	"questions/fetchQuestionById",
	async (id: string, { rejectWithValue }) => {
		try {
			const docRef = doc(db, "questions", id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return { id: docSnap.id, ...docSnap.data() } as Question;
			} else {
				throw new Error("Question not found");
			}
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const updateQuestion = createAsyncThunk(
	"questions/updateQuestion",
	async (
		{
			id,
			updatedData,
		}: { id: string; updatedData: Partial<Omit<Question, "id">> },
		{ rejectWithValue }
	) => {
		try {
			const questionRef = doc(db, "questions", id);
			await updateDoc(questionRef, updatedData);
			return { id, updatedData };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const deleteQuestion = createAsyncThunk(
	"questions/deleteQuestion",
	async (id: string, { rejectWithValue }) => {
		try {
			await deleteDoc(doc(db, "questions", id));
			return id;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// 📥 Fetch
			.addCase(fetchQuestions.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchQuestions.fulfilled, (state, action) => {
				state.questions = {
					totalCount: action.payload.totalCount,
					data: action.payload.data,
				};
				state.loading = false;
			})
			.addCase(fetchQuestions.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// ➕ Create
			.addCase(createQuestion.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.questions.data.unshift(action.payload); // Add new question to start
				state.questions.totalCount += 1;
				state.loading = false;
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// ✏️ Update
			.addCase(updateQuestion.fulfilled, (state, action) => {
				const { id, updatedData } = action.payload;
				const index = state.questions.data.findIndex((q) => q.id === id);
				if (index !== -1) {
					state.questions.data[index] = {
						...state.questions.data[index],
						...updatedData,
					};
				}
			})

			// 🗑️ Delete
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.questions.data = state.questions.data.filter(
					(q) => q.id !== action.payload
				);
				state.questions.totalCount -= 1;
			});
	},
});

export default questionsSlice.reducer;
