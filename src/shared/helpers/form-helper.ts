type AnswerChoice = { value: string };
type SelectOption = { value: string; label: string };

export const mapAnswerChoicesToSelectOptions = (
	choices: AnswerChoice[]
): SelectOption[] => {
	return choices
		.filter((choice) => !!choice.value?.trim()) // filters out null, undefined, or empty string
		.map((choice) => ({
			value: choice.value,
			label: choice.value,
		}));
};
