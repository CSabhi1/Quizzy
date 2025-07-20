/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

import {
	ModalActions,
	ModalBody,
} from "@app/shared/components/utils/modal/Modal";

interface TicketFilterProps {
	onFilterChange: (filters: any) => void;
	handleClose: any;
}

const QuestionFilter: React.FC<TicketFilterProps> = ({
	onFilterChange,
	handleClose,
}) => {
	// Fetch filter data (async data fetching)
	// const {
	// 	loading,
	// 	technicianList,
	// 	propertyList,
	// 	unitList,
	// 	priorityList,
	// 	statusList,
	// 	typeList,
	// } = useTicketFilterData({ open });

	// React Hook Form setup
	const { handleSubmit } = useForm();

	// Handle form submission
	const onSubmit = (data: any) => {
		console.log(data);
		onFilterChange(data);
	};

	// Reset filter selections
	const handleReset = () => {
		onFilterChange({}); // Reset filter in parent
	};

	// Render the form contents
	const renderFormContent = () => {
		// if (loading) {
		// 	return <TicketFilterShimmer></TicketFilterShimmer>;
		// }

		return (
			<Grid container rowSpacing={3} columnSpacing={3}>
				<Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
				<Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
			</Grid>
		);
	};

	//Form buttons
	const renderActionButton = () => {
		<Box>
			<Button onClick={handleReset} variant="outlined" component="span">
				Cancel
			</Button>
			&nbsp; &nbsp;
			<Button variant="contained" component="button" type="submit">
				Apply
			</Button>
		</Box>;
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ModalBody>{renderFormContent()}</ModalBody>
				<ModalActions>
					<Button
						type="button"
						variant="outlined"
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Button>
					{renderActionButton()}
				</ModalActions>
			</form>
		</>
	);
};

export default QuestionFilter;
