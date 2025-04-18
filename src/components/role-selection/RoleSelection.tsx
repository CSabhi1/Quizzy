import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

import {
	RoleCaption,
	RoleCard,
	SelectionContainer,
	SelectionWraper,
} from "./RoleSelection.styles";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";

const RoleSelection: React.FC = () => {
	const navigate = useNavigate();

	return (
		<SelectionWraper>
			<SelectionContainer>
				<Typography sx={{ fontWeight: 600, fontSize: "26px" }} variant="h6">
					Welcome, Abhijith!
				</Typography>
				<Typography sx={{ color: "#4a4a4a", fontWeight: 500 }}>
					How would you like to use Quizzy today?
				</Typography>
				<br />
				<Grid container spacing={5}>
					<Grid size={{ sm: 6 }}>
						<RoleCard>
							<Box sx={{ display: "flex", gap: 1 }}>
								<EventAvailableIcon color="primary"></EventAvailableIcon>{" "}
								<Typography sx={{ fontSize: 18, fontWeight: 700 }}>
									Quiz Scheduler
								</Typography>
							</Box>
							<RoleCaption>Create and schedule quizzes</RoleCaption>
							<Typography sx={{ marginTop: "17px" }}>
								Design questions, create questionnaires, and schedule quizzes
								for participants. Monitor results and manage your quiz library.
							</Typography>

							<Box mt={5}>
								<Button
									endIcon={<TrendingFlatOutlinedIcon />}
									variant="contained"
									fullWidth
									onClick={() => navigate("scheduler")}
								>
									Scheduler
								</Button>
							</Box>
						</RoleCard>
					</Grid>
					<Grid size={{ sm: 6 }}>
						<RoleCard>
							<Box sx={{ display: "flex", gap: 1 }}>
								<QuizOutlinedIcon color="primary"></QuizOutlinedIcon>
								<Typography sx={{ fontSize: 18, fontWeight: 700 }}>
									Quiz Participant
								</Typography>
							</Box>
							<RoleCaption>Take quizzes and view results</RoleCaption>
							<Typography sx={{ marginTop: "17px" }}>
								View upcoming quizzes assigned to you, take quizzes when they
								become available, and track your performance and results over
								time.
							</Typography>

							<Box mt={5}>
								<Button
									endIcon={<TrendingFlatOutlinedIcon />}
									variant="contained"
									fullWidth
									onClick={() => navigate("participant")}
								>
									Participaint
								</Button>
							</Box>
						</RoleCard>
					</Grid>
				</Grid>
			</SelectionContainer>
		</SelectionWraper>
	);
};

export default RoleSelection;
