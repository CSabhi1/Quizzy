import { Box, SxProps } from "@mui/material";

interface CardProps {
	children: React.ReactNode;
	sx?: SxProps;
}

const Card: React.FC<CardProps> = ({ children, sx }) => {
	return (
		<Box
			sx={{
				border: "1px solid #e6e6e6",
				borderRadius: "8px",
				padding: "24px",
				backgroundColor: "white",
				...sx,
			}}
		>
			{children}
		</Box>
	);
};

export default Card;
