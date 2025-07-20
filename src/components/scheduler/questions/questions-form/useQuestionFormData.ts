/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@app/redux/store";
import { fetchQuestionById, Question } from "@app/redux/slices/QuestionSlice";
import { FormValues } from "@app/shared/types/questions.types";

interface Props {
	action: "add" | "edit" | "delete" | string;
	data?: { id: string | number };
	setValue: any;
}

export const useQuestionFormData = ({ action, data, setValue }: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const [question, setQuestion] = useState<Question | null>(null);

	// Single loading calculation
	const loading = !(action !== "edit" || question);

	// Fetch dropdown options
	useEffect(() => {
		const fetchInitialData = async () => {
			// await Promise.all([dispatch(getTenantsListActionCreator())]);
			// if (action !== "edit") {
			// 	await dispatch(getTechnicianListActionCreator());
			// }
		};

		fetchInitialData();
	}, [dispatch, action]);

	// Fetch question details when editing
	useEffect(() => {
		const fetchQuestionDetails = async () => {
			if (action === "edit" && data?.id) {
				const response = await dispatch(
					fetchQuestionById(String(data.id))
				).unwrap();
				setQuestion(response);
			}
		};

		fetchQuestionDetails();
	}, [action, data?.id, dispatch]);

	// Populate form fields when data is ready
	useEffect(() => {
		if (action === "edit" && question) {
			constructForm(question);
		}
	}, [action, question, setValue]);

	const capitalize = (str: string) =>
		str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

	const formatTagLabel = (tag: string) =>
		tag
			.split("-")
			.map((word) => capitalize(word))
			.join(" ");

	const constructForm = (details: Question) => {
		const formValues: { [key in keyof FormValues]?: unknown } = {
			question: details.question,
			difficulty: details.difficulty
				? { label: capitalize(details.difficulty), value: details.difficulty }
				: null,
			tags: details.tags?.map((tag) => ({
				label: formatTagLabel(tag),
				value: tag,
			})),
			answerChoices: details.answerChoices?.map((value) => ({ value })),
			correctAnswer: details.correctAnswer
				? {
						label: details.correctAnswer,
						value: details.correctAnswer,
				  }
				: null,
		};

		Object.entries(formValues).forEach(([key, value]) => {
			setValue(key as keyof FormValues, value ?? null);
		});
	};

	return {
		loading,
	};
};
