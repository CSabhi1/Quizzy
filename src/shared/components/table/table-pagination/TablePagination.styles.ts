import { Box, Button, Select, styled, Typography } from "@mui/material";

export const PaginationContainer = styled(Box)({
	display: "flex",
	marginTtop: 12,
});

export const MuiSelect = styled(Select)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	borderRadius: "7px",
	padding: 0,
	backgroundColor: "#ffffff",
	borderColor: "#d6d6d6",
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "#d6d6d6",
	},
	"&:focus": {
		outline: "none",
	},
	"& .MuiSelect-select": {
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 2,
		paddingBottom: 2,
	},
}));

export const PaginationButtonsContainer = styled(Box)({
	marginLeft: "auto",
});

export const PageInfo = styled(Typography)({
	marginRight: 15,
	fontWeight: 500,
	color: "#373737",
	display: "inline",
});

export const PaginationButton = styled(Button)({
	padding: 5,
	marginRight: "3px",
	backgroundColor: "#f3f4f8",
	fontWeight: 700,
	border: "1px solid #d6d6d6",
	minWidth: 0,

	"&:disabled": {
		color: "grey",
		backgroundColor: "#f6f6f6",
		border: "1px solid #d6d6d6",
	},
});
