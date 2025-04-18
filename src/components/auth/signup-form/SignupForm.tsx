/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";

import TextFieldComp from "@app/shared/components/inputs/textfield/TextFieldComp";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@app/redux/store";
import { signUpWithEmail } from "@app/redux/slices/AuthSlice";

const SignupForm: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	//Form builder configuration
	const { control, handleSubmit } = useForm();

	//Form submition
	const onSubmit = (formData: any) => {
		dispatch(signUpWithEmail({ ...formData }));
	};

	return (
		<Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container rowSpacing={2} columnSpacing={4}>
					<Grid size={{ xs: 12 }}>
						<Controller
							name="username"
							control={control}
							rules={{
								required: "Name required",
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
									label="Name"
									placeholder="John Doe"
								/>
							)}
						/>
					</Grid>
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

export default SignupForm;
