import Select, {
	Props as SelectProps,
	OptionsOrGroups,
	GroupBase,
	ActionMeta,
	SingleValue,
	MultiValue,
} from "react-select";

import "./Select.css";
import { FormLabel } from "../../utils";
import theme from "@app/theme/theme";
import { Typography } from "@mui/material";

type CustomSelectProps<T> = {
	options: OptionsOrGroups<T, GroupBase<T>>;
	isMulti?: boolean;
	className?: string;
	classNamePrefix?: string;
	value: SingleValue<T> | MultiValue<T>;
	label?: string;
	helperText?: string;
	requiredLabel?: boolean;
	errors?: string;
	disable?: boolean;
	onChange: (
		newValue: SingleValue<T> | MultiValue<T>,
		actionMeta: ActionMeta<T>
	) => void;
} & Omit<SelectProps<T>, "options" | "isMulti" | "value" | "onChange">;

function SelectComp<T>({
	options,
	isMulti = false,
	className = "basic-multi-select",
	classNamePrefix = "select",
	value,
	label,
	requiredLabel,
	errors,
	disable,
	onChange,
	...rest
}: CustomSelectProps<T>) {
	return (
		<div className="select-wrapper">
			{label && (
				<FormLabel label={label} requiredLabel={requiredLabel}></FormLabel>
			)}
			<Select
				options={options}
				isMulti={isMulti}
				className={className}
				classNamePrefix={classNamePrefix}
				value={value}
				onChange={onChange}
				placeholder={label}
				isDisabled={disable}
				styles={{
					control: (base) => ({
						...base,
						borderRadius: "7px",
						fontSize: "14px",
						fontFamily: theme.typography.fontFamily,
					}),
					menu: (base) => ({
						...base,
						borderRadius: "7px",
						fontFamily: theme.typography.fontFamily,
						fontSize: "14px",
					}),
				}}
				{...rest}
				menuPortalTarget={
					document.getElementsByClassName("dialog-base")[0] as HTMLElement
				}
				menuPosition="fixed"
				isSearchable={true}
			/>
			{errors && (
				<Typography
					sx={{
						fontSize: 12,
						color: "#e01313",
					}}
				>
					{errors}
				</Typography>
			)}
		</div>
	);
}

export default SelectComp;
