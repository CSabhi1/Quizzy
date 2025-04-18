import PageContainer from "@app/layout/page-container/PageContainer";
import { Box, Button, Typography } from "@mui/material";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Card } from "@app/shared/components/utils";
import { Title } from "./Questions.styles";

const Questions = () => {
	return (
		<PageContainer
			title="Questions"
			subTitle="Create and manage your quiz questions"
			buttons={
				<Button endIcon={<AddOutlinedIcon />} variant="contained">
					Add Question
				</Button>
			}
		>
			<Card>
				<Box sx={{ display: "flex", gap: "5px" }}>
					<HelpOutlineIcon sx={{ marginLeft: "-5px" }} color="primary" />
					<Title>Question Bank</Title>
				</Box>
				<Typography marginTop="10px">
					You have 0 questions in your question bank
				</Typography>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "30vh",
						flexDirection: "column",
						gap: "10px",
					}}
				>
					<Typography variant="h6">No questions yet</Typography>
					<Typography>
						Start by adding questions to your question bank
					</Typography>
					<br />
					<Button endIcon={<AddOutlinedIcon />} variant="contained">
						Add Your First Question
					</Button>
				</Box>
			</Card>
		</PageContainer>
	);
};

export default Questions;
