import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useCallback, useState } from "react";
import Grid from "@mui/material/Grid2";

import { signInWithGoogle } from "@app/redux/slices/AuthSlice";
import SignupForm from "./signup-form/SignupForm";
import LoginForm from "./login-form/LoginForm";
import { AppDispatch } from "@app/redux/store";
import Banner from "./banner/Banner";
import theme from "@app/theme/theme";
import {
	BannerSection,
	FormContainer,
	FormWrapper,
	GoogleButton,
	LogoText,
} from "./Login.styles";

import googleLogo from "@app/assets/images/google-logo.svg";
import logo from "@app/assets/images/logo.png";

const Login: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [isLogin, setIsLogin] = useState(true);

	const onGoogleLogin = useCallback(() => {
		dispatch(signInWithGoogle());
	}, [dispatch]);

	return (
		<Grid container bgcolor="white">
			<FormContainer size={{ sm: 12, md: 6, lg: 5 }}>
				<Box sx={{ gap: "12vh", display: "flex", flexDirection: "column" }}>
					<Stack alignItems="center" direction="row" gap={1.2}>
						<img width={29} height={29} src={logo} alt="Quizzy Logo" />
						<LogoText>Quizzy</LogoText>
					</Stack>

					<FormWrapper>
						<Typography fontSize={20} fontWeight={600}>
							Hi, Welcome Back!
						</Typography>

						<GoogleButton onClick={onGoogleLogin}>
							<img width={18} src={googleLogo} alt="Google logo" /> &nbsp; Sign
							in with Google
						</GoogleButton>

						<Divider>
							<Typography>OR</Typography>
						</Divider>

						{isLogin ? <LoginForm /> : <SignupForm />}

						<Typography
							variant="body2"
							sx={{ color: theme.palette.text.secondary, marginTop: 1 }}
						>
							New to Quizzy?&nbsp;
							<Typography
								variant="body2"
								component="span"
								fontWeight={600}
								sx={{
									color: theme.palette.primary.main,
									cursor: "pointer",
								}}
								onClick={() => setIsLogin((prev) => !prev)}
							>
								Create an account.
							</Typography>
						</Typography>
					</FormWrapper>
				</Box>
			</FormContainer>

			{!isSmallScreen && (
				<BannerSection size={{ md: 6, lg: 7 }}>
					<Banner />
				</BannerSection>
			)}
		</Grid>
	);
};

export default Login;
