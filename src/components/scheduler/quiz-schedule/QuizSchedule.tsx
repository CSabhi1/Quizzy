import PageContainer from "@app/layout/page-container/PageContainer";
import { Box, Button, Typography } from "@mui/material";

import { Card, EmptyPlaceholder } from "@app/shared/components/surface";
import { Title } from "./QuizSchedule.styles";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const EmptyPlaceholderComp = () => (
	<EmptyPlaceholder
		icon={<EventAvailableIcon fontSize="inherit" />}
		title="No upcoming quizzes"
		subtitle="You haven't scheduled any quizzes yet"
		action={
			<Button
				variant="contained"
				endIcon={<AddOutlinedIcon />}
				onClick={() => console.log("Add clicked")}
			>
				Create a Quiz
			</Button>
		}
	/>
);

const QuizSchedule = () => {
	return (
		<PageContainer
			title="Quiz Schedule"
			subTitle="View and manage your scheduled quizzes"
			buttons={
				<Button endIcon={<AddOutlinedIcon />} variant="contained">
					Create Quiz
				</Button>
			}
		>
			<Card>
				<Box sx={{ display: "flex", gap: "5px" }}>
					<EventAvailableIcon sx={{ marginLeft: "-5px" }} color="primary" />
					<Title>Upcoming Quizzes</Title>
				</Box>
				<Typography marginTop="10px">
					Quizzes scheduled for the future
				</Typography>
				{EmptyPlaceholderComp()}
			</Card>
		</PageContainer>
	);
};

export default QuizSchedule;
