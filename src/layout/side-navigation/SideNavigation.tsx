/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import {
	CSSObject,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
	useMediaQuery,
	Typography,
	Stack,
	Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import logo from "@app/assets/images/logo.png";
import { HeaderWraper, MuiDrawer } from "./SideNavigation.styles";

// Define drawer width for consistent styling
const drawerWidth = "15em";

/**
 * Generates styles for the Drawer based on its state (open or closed).
 * @param theme - The Material-UI theme object.
 * @param open - Boolean flag indicating whether the drawer is open.
 * @returns CSS styles for the drawer.
 */
const getDrawerStyles = (theme: Theme, open: boolean): CSSObject => ({
	width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: open
			? theme.transitions.duration.enteringScreen
			: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	...(open && { width: drawerWidth }),
	...(!open && {
		[theme.breakpoints.up("sm")]: {
			width: `calc(${theme.spacing(8)} + 1px)`,
		},
	}),
});

interface SideNavigationProps {
	open: boolean;
	handleDrawer: () => void;
	menuItems: any[];
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
	open,
	handleDrawer,
	menuItems,
}) => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Check if the screen is small

	//Handles menu item click.
	const handleMenuItemClick = () => {
		if (isSmallScreen) {
			handleDrawer();
		}
	};

	return (
		<MuiDrawer
			variant={isSmallScreen ? "temporary" : "permanent"}
			open={open}
			onClose={handleDrawer}
			sx={{
				...getDrawerStyles(theme, open),
				"& .MuiDrawer-paper": getDrawerStyles(theme, open),
			}}
		>
			{/* Drawer Header */}
			<HeaderWraper
				open={open}
				sx={{
					...theme.mixins.toolbar,
				}}
			>
				{/* Logo (Visible only when the drawer is open) */}
				{open && (
					<Stack direction="row" alignItems="center" gap={1}>
						<img style={{ width: 23 }} src={logo} alt="Logo" />
						<Typography
							fontWeight={600}
							fontSize={17}
							sx={{
								fontFamily: '"Montserrat Alternates", sans-serif',
								fontStyle: "normal",
							}}
						>
							Quizzy
						</Typography>
					</Stack>
				)}

				{/* Drawer Toggle Button */}
				<IconButton onClick={handleDrawer}>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</HeaderWraper>

			{/* Navigation Menu List */}
			<List sx={{ px: open ? 2 : 0 }}>
				{menuItems.map((menu) => (
					<NavLink
						key={menu.name}
						to={menu.path}
						style={{
							textDecoration: "none",
							color: "inherit",
							marginBottom: 20,
						}}
						end={true}
						onClick={handleMenuItemClick} // Closes drawer when a menu item is clicked
					>
						{({ isActive }) => (
							<ListItem disablePadding sx={{ display: "block" }}>
								<ListItemButton
									selected={isActive}
									sx={{
										minHeight: 48,
										px: 2.5,
										justifyContent: open ? "initial" : "center",
										borderRadius: 0.8,
										backgroundColor: isActive ? "#e4ecea" : "",
									}}
								>
									{/* Menu Icon (Changes based on active state) */}
									<ListItemIcon
										sx={{
											minWidth: 0,
											justifyContent: "center",
											mr: open ? 1.5 : "auto",
										}}
									>
										{isActive ? menu.activeIcon : menu.icon}
									</ListItemIcon>

									{/* Menu Item Text (Hidden when drawer is closed) */}
									<ListItemText
										primary={menu.name}
										className="menu-text"
										slotProps={{
											primary: {
												fontSize: theme.typography.body1.fontSize,
												fontWeight: isActive ? "600" : "500",
											},
										}}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						)}
					</NavLink>
				))}
			</List>

			{open ? (
				<Button
					sx={{
						margin: 2,
						marginTop: "auto",
					}}
					variant="outlined"
					startIcon={<SwapHorizOutlinedIcon />}
				>
					Switch to Participant
				</Button>
			) : (
				<IconButton
					sx={{
						margin: 2,
						marginTop: "auto",
					}}
				>
					<SwapHorizOutlinedIcon></SwapHorizOutlinedIcon>
				</IconButton>
			)}
		</MuiDrawer>
	);
};
