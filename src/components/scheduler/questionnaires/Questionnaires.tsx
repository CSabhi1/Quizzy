import PageContainer from "@app/layout/page-container/PageContainer";
import { Button } from "@mui/material";

import { Card, EmptyPlaceholder } from "@app/shared/components/surface";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const EmptyPlaceholderComp = () => (
	<EmptyPlaceholder
		icon={<MenuBookIcon fontSize="inherit" />}
		title="No questionnaires yet"
		subtitle="Get started by creating a new questionnaire"
		action={
			<Button
				variant="contained"
				endIcon={<AddOutlinedIcon />}
				onClick={() => console.log("Add clicked")}
			>
				Create Your First Questionnaire
			</Button>
		}
	/>
);

const Questionnaires = () => {
	return (
		<PageContainer
			title="Questionnaires"
			subTitle="Create and manage your questionnaires"
			buttons={
				<Button endIcon={<AddOutlinedIcon />} variant="contained">
					Create Questionnaire
				</Button>
			}
		>
			<Card>{EmptyPlaceholderComp()}</Card>
		</PageContainer>
	);
};

export default Questionnaires;
