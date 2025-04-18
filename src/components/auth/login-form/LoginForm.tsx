/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid2";

import TextFieldComp from "@app/shared/components/inputs/textfield/TextFieldComp";
import { AppDispatch } from "@app/redux/store";
import { signInWithEmail } from "@app/redux/slices/AuthSlice";

const LoginForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	//Form builder configuration
	const { control, handleSubmit } = useForm();

	//Form submition
	const onSubmit = (formData: any) => {
		dispatch(signInWithEmail({ ...formData }));
	};
	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="email"
							control={control}
							rules={{
								required: "Email required",
								pattern: {
									value: /.*\S.*/,
									message: "Please enter valid email.",
								},
							}}
							render={({ field, fieldState }) => (
								<TextFieldComp
									errors={fieldState.error?.message}
									inputType="text"
									field={field}
									label="Email"
									placeholder="jondoe@example.com"
								/>
							)}
						/>
					</Grid>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="password"
							control={control}
							rules={{
								required: "Pasword required",
								pattern: {
									value: /.*\S.*/,
									message: "Please enter valid name.",
								},
							}}
							render={({ field, fieldState }) => (
								<TextFieldComp
									errors={fieldState.error?.message}
									inputType="password"
									field={field}
									label="Password"
									placeholder="********"
								/>
							)}
						/>
					</Grid>
					<Grid
						sx={{
							display: "flex",
							justifyContent: "center",
							flexDirection: "column",
						}}
						size={{ xs: 12 }}
					>
						<Button sx={{ marginTop: 2 }} type="submit" variant="contained">
							Sign in
						</Button>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
};

export default LoginForm;
