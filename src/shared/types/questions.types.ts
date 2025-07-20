export type FormValues = {
	question: string;
	difficulty: { label: string; value: string } | null;
	tags: { label: string; value: string }[] | null;
	answerChoices: { value: string }[];
	correctAnswer: { label: string; value: string } | null;
};
