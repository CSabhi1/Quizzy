import {
	styled,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	Box,
	BoxProps,
	TableBody,
	TableRowProps,
} from "@mui/material";

export const MuiTableContainer = styled(TableContainer)({
	width: "100%",
	maxWidth: "100",
	// maxHeight: calc(70vh - 20px);
	overflow: "auto",
	borderRadius: 9,
	paddingBottom: 4,
});

export const MuiTable = styled(Table)({
	padding: 0,
	borderRadius: 10,
	backgroundColor: "white",
	border: "1px solid #e0e0e0", // ✅ Add border here
	borderCollapse: "separate", // ✅ Optional: keeps border-radius visible
});

export const MuiTableHead = styled(TableHead)(({ theme }) => ({
	textAlign: "left",
	color: theme.palette.primary.main,
}));

export const MuiTableRow = styled(TableRow)({
	borderRadius: 10,
	backgroundColor: "#D8DDE2",
});

export const MuiTableCell = styled(TableCell)({
	padding: "9px 17px",
	fontWeight: 600,
	position: "sticky",
	top: 0,
	background: "#D8DDE2",
	color: "rgb(0, 28, 48)",
	zIndex: 999,
	borderRight: "1px solid #f8f8f8",
});

export const SortIconWrapper = styled(Box)<BoxProps>(() => ({
	marginLeft: "8px",
	color: "rgb(0, 0, 0)",
	fontWeight: 700,
}));

export const MuiTableBody = styled(TableBody)({
	borderBottom: "1px solid lightgray",
	color: "rgb(53, 66, 89)",
});

interface MuiTableRowBodyProps extends TableRowProps {
	clickable?: boolean;
}

export const MuiTableRowBody = styled(TableRow, {
	shouldForwardProp: (prop) => prop !== "clickable",
})<MuiTableRowBodyProps>(({ clickable }) => ({
	...(clickable && {
		transitionDuration: "300ms",
		cursor: "pointer",
		"&:hover": {
			backgroundColor: "#f7f7f7",
		},
	}),
}));

export const MuiTableCellBody = styled(TableCell)({
	padding: "7px 18px",
	transition: "transform 0.3s ease, box-shadow 0.3s ease",
	fontWeight: 500,
	// Apply styles when the parent <tr> is even-numbered
	"tr:nth-of-type(even) &": {
		borderBottom: "1px solid #F4F3F3",
	},

	// Apply border to all rows except the last one
	"tr:not(:last-of-type) &": {
		borderBottom: "1px solid rgb(232, 232, 232)",
	},

	// Remove border from last row
	"tr:last-of-type &": {
		borderBottom: "none",
	},
});
