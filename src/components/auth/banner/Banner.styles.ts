import { Box, styled, Typography } from "@mui/material";

export const BannerContainer = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "95vh",
	position: "relative",
	overflow: "hidden",
	borderTopLeftRadius: "40px",
	boxSizing: "border-box",
	padding: theme.spacing(5),
	borderBottomRightRadius: "40px",
	display: "flex",
	justifyContent: "space-between",
	flexDirection: "column",

	[theme.breakpoints.up("sm")]: {},
	[theme.breakpoints.up("md")]: {},
	[theme.breakpoints.up("lg")]: {},
}));

export const BannerHeading = styled(Typography)({
	color: "white",
	fontFamily: ' "Poiret One", sans-serif',
	fontSize: 50,
	textAlign: "center",
});

export const SlideContainer = styled(Box)(({ theme }) => ({
	borderRadius: "10px",
	backgroundColor: "rgba(0, 0, 0, 0.2)",
	boxSizing: "border-box",
	padding: theme.spacing(4),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
}));
