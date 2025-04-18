import { Box, styled, Typography } from "@mui/material";

export const SelectionWraper = styled(Box)({
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#f9fafc",
});

export const SelectionContainer = styled(Box)({
	width: "70vw",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "15px",
});

export const RoleCard = styled(Box)(({ theme }) => ({
	border: "1px solid rgb(208, 208, 208)",
	padding: "35px",
	borderRadius: "8px",
	maxWidth: "350px",
	justifySelf: "end",
	backgroundColor: "white",
	transitionDuration: ".3s",
	"&:hover": {
		borderColor: theme.palette.primary.main,
	},
}));

export const RoleCaption = styled(Typography)({
	fontSize: "13px",
	color: "#888888",
	fontWeight: 600,
	marginTop: "5px",
	marginBottom: "5px",
});
