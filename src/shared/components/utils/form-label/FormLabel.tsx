import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type FormControlLabelProps = {
	label: string;
	requiredLabel?: boolean;
} & TypographyProps;

const StyledLabel = styled(Typography)(({ theme }) => ({
	marginBottom: "8px",
	fontWeight: 500,
	fontSize: theme.typography.body1.fontSize,
	display: "flex",
	alignItems: "center",
	gap: "4px",
}));

const RequiredLabel = styled(Typography)({
	color: "#e01313",
	fontWeight: 600,
});

const FormLabel: React.FC<FormControlLabelProps> = ({
	label,
	requiredLabel,
	...props
}) => {
	return (
		<StyledLabel {...props}>
			{label}
			{requiredLabel && <RequiredLabel>*</RequiredLabel>}
		</StyledLabel>
	);
};

export default FormLabel;
