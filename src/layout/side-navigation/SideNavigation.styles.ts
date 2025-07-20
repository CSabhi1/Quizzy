import { Box, Drawer, styled, Typography } from "@mui/material";

export const MuiDrawer = styled(Drawer)({
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	zIndex: 1300,
});

interface HeaderWrapperProps {
	open?: boolean;
}

export const HeaderWraper = styled(Box)<HeaderWrapperProps>(({ theme, open }) =>
	open
		? {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				paddingLeft: theme.spacing(2),
				paddingRight: theme.spacing(2),
				gap: theme.spacing(2),
				border: "1px solid rgb(221, 221, 221)",
				margin: 17,
				borderRadius: 8,
		  }
		: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				margin: 17,
		  }
);

export const LogoTitle = styled(Typography)({
	fontFamily: '"Montserrat Alternates", sans-serif',
	fontStyle: "normal",
	fontWeight: 600,
	fontSize: 17,
});
