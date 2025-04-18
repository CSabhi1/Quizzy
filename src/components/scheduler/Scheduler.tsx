import { SideNavigation } from "@app/layout/side-navigation/SideNavigation";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";

import Header from "@app/layout/header/Header";

import DashboardIcon from "@mui/icons-material/Dashboard";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Scheduler() {
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
		{
			name: "Create Quiz",
			path: "/scheduler/create-quiz",
			icon: <AddCircleOutlineIcon fontSize="small" sx={{ color: "black" }} />,
			activeIcon: <AddCircleOutlineIcon fontSize="small" color="primary" />,
		},
		{
			name: "Questionnaires",
			path: "/scheduler/questionnaires",
			icon: <MenuBookIcon fontSize="small" sx={{ color: "black" }} />,
			activeIcon: <MenuBookIcon fontSize="small" color="primary" />,
		},
		{
			name: "Questions",
			path: "/scheduler/questions",
			icon: <HelpOutlineIcon fontSize="small" sx={{ color: "black" }} />,
			activeIcon: <HelpOutlineIcon fontSize="small" color="primary" />,
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
}
