import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@app/redux/store";
import { signOutUser } from "@app/redux/slices/AuthSlice";

// Define the prop types for the Header component
interface HeaderProps {
	handleDrawer: () => void; // Function to handle opening/closing of a drawer
}

const Header: React.FC<HeaderProps> = ({ handleDrawer }) => {
	const dispatch = useDispatch<AppDispatch>();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const { user } = useSelector((state: RootState) => state.auth);

	// State to manage the user menu anchor element
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleLogout = async () => {
		await dispatch(signOutUser());
	};

	/**
	 * Opens the user menu when the avatar is clicked
	 * @param event - React mouse event
	 */
	const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	/**
	 * Closes the user menu
	 */
	const closeUserMenu = () => {
		setAnchorElUser(null);
	};

	// Menu items (for better maintainability)
	const menuItems = [{ label: "Log Out", onClick: handleLogout }];

	return (
		<AppBar
			position="fixed"
			sx={{
				bgcolor: "white",
				minHeight: "auto",
				padding: 0.6,
				borderBottom: "1px solid rgb(232, 232, 232)",
			}}
		>
			<Container maxWidth={false}>
				<Toolbar disableGutters variant="dense">
					{/* Left side: Drawer toggle button (visible only on small screens) */}
					<Box sx={{ flexGrow: 1 }}>
						{isSmallScreen && (
							<IconButton
								aria-label="Open menu"
								sx={{ padding: 0 }}
								onClick={handleDrawer}
							>
								<MenuIcon />
							</IconButton>
						)}
					</Box>

					{/* Right side: User avatar and menu */}
					<Box sx={{ flexGrow: 0 }}>
						<IconButton
							aria-label="Open user menu"
							disableRipple
							onClick={openUserMenu}
							sx={{ p: 0 }}
						>
							<Avatar
								src={user?.photoURL || undefined}
								sx={{ width: 30, height: 30 }}
								alt={user?.displayName || undefined}
							/>
						</IconButton>

						{/* User menu dropdown */}
						<Menu
							sx={{ mt: "25px", boxShadow: "none" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							keepMounted
							open={Boolean(anchorElUser)}
							onClose={closeUserMenu}
						>
							{menuItems.map((item, index) => (
								<MenuItem key={index} onClick={item.onClick}>
									<Typography
										sx={{
											textAlign: "center",
											fontSize: ".9rem",
											fontWeight: "500",
										}}
									>
										{item.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
