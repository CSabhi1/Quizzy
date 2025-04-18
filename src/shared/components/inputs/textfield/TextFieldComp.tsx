import { TextField } from "@mui/material";

import { FormLabel } from "@app/shared/components/utils";

type inputPops = {
	field: {
		name: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		onBlur: () => void;
		value: unknown;
	};
	errors?: string;
	inputType?: string; // Optional input type
	isHideLabel?: boolean;
	label: string;
	placeholder?: string;
	disable?: boolean;
	requiredLabel?: boolean;
	helperText?: string;
	multiline?: boolean;
	rows?: number;
};

function TextFieldComp({
	errors,
	field,
	label,
	placeholder,
	isHideLabel = false,
	disable,
	requiredLabel,
	multiline = false,
	rows,
	inputType,
}: inputPops) {
	return (
		<>
			{!isHideLabel && (
				<FormLabel label={label} requiredLabel={requiredLabel}></FormLabel>
			)}

			<TextField
				size="small"
				fullWidth
				id="outlined-basic"
				variant="outlined"
				disabled={disable}
				rows={rows}
				multiline={multiline}
				placeholder={placeholder}
				{...field}
				type={inputType}
				// error={!!errors}
				helperText={errors ? errors : ""}
			/>
		</>
	);
}
export default TextFieldComp;
