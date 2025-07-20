/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Breakpoint } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions, DialogContent } from "@mui/material";

type ModalProps = {
	open: boolean;
	handleClose: () => void;
	heading: string;
	body: any;
	size?: Breakpoint;
	ModalBodyClassName?: string;
	style?: {};
};

type ModalBodyProps = {
	children: React.ReactNode;
};

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
	<DialogContent
		sx={{ maxHeight: "55vh", p: { xs: 3, sm: 3, md: 3 } }}
		dividers
	>
		{children}
	</DialogContent>
);

export const ModalActions: React.FC<any> = ({ children }) => {
	return (
		<DialogActions sx={{ p: { xs: 1, sm: 2, md: 2 } }}>
			{children}
		</DialogActions>
	);
};

const Modal: React.FC<ModalProps> = ({
	open,
	handleClose,
	heading,
	body,
	size = "sm",
	style = {},
}) => {
	return (
		<>
			<Dialog
				maxWidth={size}
				fullWidth={true}
				open={open}
				onClose={handleClose}
				style={style}
				scroll="paper"
				sx={{ "& .MuiPaper-root": { borderRadius: "8px", p: 0 } }}
			>
				<DialogTitle
					sx={{ m: 0, fontSize: "18px", fontWeight: "600" }}
					id="customized-dialog-title"
				>
					{heading}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={(theme) => ({
						position: "absolute",
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>
				{body}
			</Dialog>
		</>
	);
};

export default Modal;
