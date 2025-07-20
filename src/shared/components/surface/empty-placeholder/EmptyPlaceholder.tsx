import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type EmptyPlaceholderProps = {
	title: string;
	subtitle?: string;
	action?: ReactNode;
	icon?: ReactNode;
};

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
	title,
	subtitle,
	action,
	icon,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "30vh",
				flexDirection: "column",
				textAlign: "center",
			}}
		>
			{icon && <Box sx={{ color: "#b0b0b0", fontSize: 50 }}>{icon}</Box>}

			<Typography
				sx={{
					fontSize: 18,
				}}
				fontWeight={600}
			>
				{title}
			</Typography>

			{subtitle && <Typography>{subtitle}</Typography>}

			{action && <Box mt={5}>{action}</Box>}
		</Box>
	);
};

export default EmptyPlaceholder;
