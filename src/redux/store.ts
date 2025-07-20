import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import questionsReducer from "./slices/QuestionSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		questions: questionsReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
