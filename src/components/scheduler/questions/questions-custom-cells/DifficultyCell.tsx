import React from "react";
import { Chip } from "@mui/material";

/**
 * Props for the DifficultyCell component.
 * @property difficulty - The difficulty level ("easy", "medium", "hard").
 */
interface DifficultyCellProps {
	difficulty: string;
}

/**
 * Returns custom background and text color styles based on the difficulty.
 *
 * - "easy" → green
 * - "medium" → orange
 * - "hard" → red
 */
const getDifficultyStyles = (difficulty: string) => {
	switch (difficulty?.toLowerCase()) {
		case "easy":
			return {
				backgroundColor: "#e6f4ea", // light green
				color: "#2e7d32", // dark green
			};
		case "medium":
			return {
				backgroundColor: "#fff3e0", // light orange
				color: "#ef6c00", // dark orange
			};
		case "hard":
			return {
				backgroundColor: "#fdecea", // light red
				color: "#d32f2f", // dark red
			};
		default:
			return {
				backgroundColor: "#f5f5f5",
				color: "#424242",
			};
	}
};

/**
 * DifficultyCell component
 *
 * Displays difficulty as a stylized Chip with contextual colors.
 *
 * @param {DifficultyCellProps} props - Component props with difficulty value.
 * @returns A styled MUI Chip representing the difficulty.
 */
const DifficultyCell: React.FC<DifficultyCellProps> = ({ difficulty }) => {
	const styles = getDifficultyStyles(difficulty);

	return (
		<Chip
			size="small"
			label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
			sx={{
				fontWeight: 500,
				minWidth: 70,
				...styles,
			}}
		/>
	);
};

export default DifficultyCell;
