import { Box, styled, Typography } from "@mui/material";

//Styled component for page container with responsive padding.
const PageContainerWrapper = styled(Box)(({ theme }) => ({
	padding: theme.spacing(10, 4, 0, 4),

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(10, 3, 0, 3),
	},

	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(10, 3, 0, 3),
	},
}));

interface PageContainerProps {
	children: React.ReactNode;
	title: string;
	subTitle?: string;
	buttons?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
	children,
	title,
	subTitle,
	buttons,
}) => {
	return (
		<PageContainerWrapper>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box component="div">
					<Typography
						sx={{
							fontSize: "20px",
							fontWeight: 600,
						}}
					>
						{title}
					</Typography>
					<Typography variant="caption">{subTitle}</Typography>
				</Box>
				<Box sx={{ alignContent: "center" }}>{buttons}</Box>
			</Box>
			<br />
			<br />
			{children}
		</PageContainerWrapper>
	);
};

export default PageContainer;
