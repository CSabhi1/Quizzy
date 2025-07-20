import { Box } from "@mui/material";
import { ReactNode } from "react";

type TableActionContainerProps = {
  children: ReactNode;
};

const TableActionContainer: React.FC<TableActionContainerProps> = ({
  children,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>{children}</Box>
  );
};
export default TableActionContainer;
