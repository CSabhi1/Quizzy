import PageContainer from "@app/layout/page-container/PageContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Title, Value } from "./Dashboard.styles";
import { Card } from "@app/shared/components/surface";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const Dashboard = () => {
	return (
		<PageContainer
			title="Dashboard"
			subTitle="Manage your quizzes, questions, and schedules"
			buttons={
				<Button endIcon={<AddOutlinedIcon />} variant="contained">
					Create Quiz
				</Button>
			}
		>
			<Grid container spacing={3}>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<Card>
						<Box sx={{ display: "flex", gap: "5px" }}>
							<HelpOutlineIcon sx={{ marginLeft: "-2px" }} color="primary" />
							<Title>Questions</Title>
						</Box>
						<br />
						<Value variant="h6">100</Value>
						<Typography variant="caption">Total questions created</Typography>
						<Box mt={2.5}>
							<Button
								endIcon={<TrendingFlatOutlinedIcon />}
								variant="contained"
							>
								Manage Questions
							</Button>
						</Box>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<Card>
						<Box sx={{ display: "flex", gap: "5px" }}>
							<MenuBookIcon sx={{ marginLeft: "-2px" }} color="primary" />
							<Title>Questionnaires</Title>
						</Box>
						<br />
						<Value variant="h6">50</Value>
						<Typography variant="caption">
							Total questionnaires created
						</Typography>
						<Box mt={2.5}>
							<Button
								endIcon={<TrendingFlatOutlinedIcon />}
								variant="contained"
							>
								Manage Questionnaires
							</Button>
						</Box>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<Card>
						<Box sx={{ display: "flex", gap: "5px" }}>
							<EventAvailableIcon sx={{ marginLeft: "-2px" }} color="primary" />
							<Title>Quizzes</Title>
						</Box>
						<br />
						<Value variant="h6">10</Value>
						<Typography variant="caption">Total quizzes created</Typography>

						<Box mt={2.5}>
							<Button
								endIcon={<TrendingFlatOutlinedIcon />}
								variant="contained"
							>
								View Schedule
							</Button>
						</Box>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 8 }}>
					<Card>
						<Box sx={{ display: "flex", gap: "5px" }}>
							<AccessTimeOutlinedIcon
								sx={{ marginLeft: "-2px" }}
								color="primary"
							/>
							<Title>Upcoming Quizzes</Title>
						</Box>
						<br />
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "column",
								minHeight: "25vh",
							}}
						>
							<Typography variant="caption">
								No upcoming quizzes scheduled
							</Typography>

							<Box mt={1}>
								<Button
									endIcon={<TrendingFlatOutlinedIcon />}
									variant="contained"
								>
									Schedule a Quiz
								</Button>
							</Box>
						</Box>
					</Card>
				</Grid>
				<Grid size={{ xs: 12, sm: 6, md: 4 }}>
					<Card>
						<Box sx={{ display: "flex", gap: "5px" }}>
							<TrendingUpOutlinedIcon
								sx={{ marginLeft: "-2px" }}
								color="primary"
							/>
							<Title>Statistics</Title>
						</Box>
						<br />
						<Box sx={{ marginTop: "20px", minHeight: "22.6vh" }}>
							<Stack direction="column" gap={1.5}>
								<Stack justifyContent="space-between" direction="row">
									<Typography fontWeight={600}> Total Participants</Typography>
									<Typography fontWeight={600}> 10</Typography>
								</Stack>
								<Stack justifyContent="space-between" direction="row">
									<Typography fontWeight={600}> Average Questions</Typography>
									<Typography fontWeight={600}> 5</Typography>
								</Stack>
								<Stack justifyContent="space-between" direction="row">
									<Typography fontWeight={600}> Completion Rate</Typography>
									<Typography fontWeight={600}> 70%</Typography>
								</Stack>
							</Stack>
							<Box mt={2.5}>
								<Button
									endIcon={<TrendingFlatOutlinedIcon />}
									variant="contained"
								>
									View Participants
								</Button>
							</Box>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</PageContainer>
	);
};

export default Dashboard;
