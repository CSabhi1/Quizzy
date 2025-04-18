import Header from "@app/layout/header/Header";
import { SideNavigation } from "@app/layout/side-navigation/SideNavigation";
import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const Participant = () => {
	const [open, setOpen] = useState(true);

	// Function to toggle the sidebar
	const handleDrawer = () => {
		setOpen((state) => !state);
	};

	//Menu items configuration for the sidebar navigation.
	const menuItems = [
		{
			name: "Dashboard",
			path: "/scheduler",
			icon: <DashboardIcon fontSize="small" sx={{ color: "black" }} />,
			activeIcon: <DashboardIcon fontSize="small" color="primary" />,
		},
		{
			name: "Schedule",
			path: "/scheduler/quiz-schedule",
			icon: <EventAvailableIcon fontSize="small" sx={{ color: "black" }} />,
			activeIcon: <EventAvailableIcon fontSize="small" color="primary" />,
		},
	];

	return (
		<Box display="flex">
			<SideNavigation
				open={open}
				handleDrawer={handleDrawer}
				menuItems={menuItems}
			></SideNavigation>
			<Box width="100%">
				<Header handleDrawer={handleDrawer}></Header>
				<Outlet></Outlet>
			</Box>
		</Box>
	);
};

export default Participant;
