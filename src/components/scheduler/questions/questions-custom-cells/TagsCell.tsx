import React from "react";
import { Chip, Stack } from "@mui/material";

/**
 * Props for the TagsCell component.
 * @property tags - An array of tag strings to display.
 */
interface TagsCellProps {
	tags: string[] | undefined;
}

/**
 * TagsCell component
 *
 * A reusable table cell renderer that displays tags as MUI Chips.
 * Tags are numbered (e.g., "1. math") and styled with a neutral theme.
 *
 * @param {TagsCellProps} props - The props including an array of tags.
 * @returns A stack of styled chips representing tags.
 */
const TagsCell: React.FC<TagsCellProps> = ({ tags }) => {
	return (
		<Stack direction="row" flexWrap="wrap" gap={1}>
			{tags?.map((tag, index) => (
				<Chip
					key={index}
					label={`${tag}`}
					size="small"
					sx={{
						backgroundColor: "#e0f2f1", // light teal
						color: "#00695c", // dark teal
						fontWeight: 500,
					}}
				/>
			))}
		</Stack>
	);
};

export default TagsCell;
