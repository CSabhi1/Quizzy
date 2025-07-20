import { Box, Button, Grid2, styled, Typography } from "@mui/material";

export const FormContainer = styled(Grid2)(({ theme }) => ({
	height: "100vh",
	padding: theme.spacing(5),
	display: "flex",
	flexDirection: "column",
	width: "100%",
	gap: "12vh",

	[theme.breakpoints.down("md")]: {
		padding: theme.spacing(10),
	},
	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(5),
	},
}));

export const LogoText = styled(Typography)({
	fontFamily: '"Montserrat Alternates", sans-serif',
	fontWeight: 700,
	fontSize: "26px",
	fontStyle: "normal",
});

export const FormWrapper = styled(Box)({
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignSelf: "center",
	gap: "20px",
	maxWidth: 350,
	width: "100%",
});

export const GoogleButton = styled(Button)({
	borderColor: "rgb(226, 226, 226)",
	color: "#696969",
	marginTop: 10,
	textTransform: "none",
	fontWeight: 500,
});

export const BannerSection = styled(Grid2)({
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: 20,
});
