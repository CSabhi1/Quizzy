import { createTheme } from "@mui/material/styles";

const FONT_SIZES = {
	medium: "14px",
	small: "14px",
	formLabel: "14px",
	inputError: "12px",
};

const theme = createTheme({
	shape: {
		borderRadius: 10,
	},

	palette: {
		primary: {
			main: "#1f6048", // Main primary color
			light: "#FFF5F5", // Lighter shade
			dark: "#1565C0", // Darker shade
			contrastText: "#ffffff", // Text color for contrast
		},
		secondary: {
			main: "#E91E63",
			light: "#F48FB1",
			dark: "#C2185B",
			contrastText: "#ffffff",
		},
		background: {
			default: "#F5F5F5", // Default page background
			paper: "#ffffff", // Background for Paper components
		},
		text: {
			primary: "#212121", // Default text color
			secondary: "#444444", // Secondary text color
		},
	},

	typography: {
		fontFamily: "Open Sans", // Global font family
		body1: {
			fontSize: FONT_SIZES.medium,
			fontWeight: 400,
		},
		caption: {
			fontSize: FONT_SIZES.small,
			color: "#797979",
			fontWeight: 500,
		},
	},

	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "#FFFFFF",
					color: "black",
					boxShadow: "none",
				},
			},
		},

		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: "7px",
					textTransform: "none",
					padding: "4px 22px",
					fontSize: FONT_SIZES.small,
					boxShadow: "none",
					border: `1px solid ${theme.palette.primary.main}`,
				}),
				contained: ({ theme }) => ({
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.primary.contrastText,
					"&:hover": {
						backgroundColor: theme.palette.primary.main,
						boxShadow: "none",
					},
				}),
				outlined: ({ theme }) => ({
					color: theme.palette.primary.main,
					"&:hover": {
						borderColor: theme.palette.primary.main,
					},
				}),
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: {
					color: "inherit",
					fontSize: FONT_SIZES.medium,
					padding: "1px",
				},
			},
		},

		MuiTextField: {
			styleOverrides: {
				root: {
					backgroundColor: "#f6f9f8",

					fontSize: FONT_SIZES.small,
					"& .MuiInputBase-input": {
						fontSize: FONT_SIZES.small,
					},
					"& .MuiOutlinedInput-root": {
						borderRadius: "8px",
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							// border: "1px solid grey",
						},
					},
					"& .MuiOutlinedInput-notchedOutline": {
						border: "1px solid #aaaaaa ", // Default border color
					},
					"&:hover .MuiOutlinedInput-notchedOutline": {
						border: "1px solid green", // Border color on hover
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: "red", // Border color when focused
					},
				},
			},
		},

		MuiDivider: {
			styleOverrides: {
				root: ({ theme }) => ({
					marginTop: theme.spacing(1.5),
					marginBottom: theme.spacing(1.5),
					backgroundColor: "white",
				}),
			},
		},

		MuiFormHelperText: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.main,
					fontSize: FONT_SIZES.inputError,
					display: "inline-block",
					margin: 0,
				}),
			},
		},
	},
});

export default theme;
