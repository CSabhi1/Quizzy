import { Box, Select, styled, TextField } from "@mui/material";

export const HeaderActionsContainer = styled(Box)({
	display: "flex",
	gap: 8,
	alignItems: "center",
	marginBottom: 15,
});

export const SearchContainer = styled(Box)({
	display: "flex",
	border: "1px solid #d6d6d6",
	borderRadius: 7,
	backgroundColor: "white",
});

export const MuiSelect = styled(Select)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	borderRadius: "7px",
	padding: 0,
	backgroundColor: "#ffffff",
	border: "none",
	"& .MuiSelect-select": {
		paddingRight: 10,
		paddingLeft: 10,
		paddingTop: 2,
		paddingBottom: 2,
	},
	"& .MuiOutlinedInput-notchedOutline": {
		border: "none",
	},
	"&.MuiOutlinedInput-root": {
		"&:hover .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: "none",
		},
	},
}));

export const SearchTextContainer = styled(Box)({
	border: "none",
	borderLeft: "1px solid #d6d6d6",
	borderRadius: 0,
	marginLeft: 10,
	paddingTop: 1,
});

export const MuiTextField = styled(TextField)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: theme.typography.body1.fontSize,
	borderRadius: "7px",
	backgroundColor: "#ffffff",

	"& .MuiOutlinedInput-root": {
		borderRadius: "7px",

		"& fieldset": {
			border: "none",
		},

		"&:hover fieldset": {
			border: "none",
		},

		"&.Mui-focused fieldset": {
			border: "none",
		},
	},
}));

export const FilterContainer = styled(Box)({
	float: "right",
	marginRight: "auto",
	display: "flex",
	gap: 8,
});

export const CustomButtonContainer = styled(Box)({
	float: "right",
	marginLeft: "auto",
	display: "flex",
	gap: 8,
});
