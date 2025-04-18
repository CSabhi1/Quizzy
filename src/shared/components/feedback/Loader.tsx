import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
				backgroundColor: "#f5f5f5",
			}}
		>
			<CircularProgress />
		</Box>
	);
};

export default Loader;
