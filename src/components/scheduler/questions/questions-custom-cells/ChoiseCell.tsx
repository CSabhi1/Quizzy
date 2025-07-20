import React from "react";
import { Chip, Stack } from "@mui/material";

/**
 * Props for the AnswerChoicesCell component.
 * @property answerChoices - An array of possible answer strings.
 * @property correctAnswer - The correct answer string that will be highlighted.
 */
interface AnswerChoicesCellProps {
	answerChoices: string[];
	correctAnswer: string;
}

/**
 * AnswerChoicesCell component
 *
 * A reusable table cell renderer that displays multiple answer choices
 * as MUI Chips. The correct answer is highlighted using a green background
 * and green text, while incorrect choices are shown in a neutral style.
 * Each answer is prefixed with its number (e.g., "1. Answer").
 *
 * @param {AnswerChoicesCellProps} props - The props including answer choices and the correct answer.
 * @returns A stack of styled chips representing answer options.
 */
const AnswerChoicesCell: React.FC<AnswerChoicesCellProps> = ({
	answerChoices,
	correctAnswer,
}) => {
	return (
		<Stack direction="row" flexWrap="wrap" gap={1}>
			{answerChoices.map((choice, index) => {
				const isCorrect = choice === correctAnswer;
				const numberedLabel = `${index + 1}. ${choice}`;

				return (
					<Chip
						key={index}
						label={numberedLabel}
						size="small"
						sx={{
							backgroundColor: isCorrect ? "#e6f4ea" : "#f5f5f5", // light green or grey
							color: isCorrect ? "#2e7d32" : "#424242", // green or grey text
							fontWeight: isCorrect ? 600 : 400,
						}}
					/>
				);
			})}
		</Stack>
	);
};

export default AnswerChoicesCell;
