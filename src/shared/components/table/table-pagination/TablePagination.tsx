import React, { useMemo } from "react";
import { MenuItem } from "@mui/material";

import {
	MuiSelect,
	PageInfo,
	PaginationButton,
	PaginationButtonsContainer,
	PaginationContainer,
} from "./TablePagination.styles";
import {
	KeyboardArrowLeftIcon,
	KeyboardArrowRightIcon,
	KeyboardDoubleArrowLeftIcon,
	KeyboardDoubleArrowRightIcon,
} from "../../utils/mui-icons";

/**
 * Props for the TablePagination component.
 */
interface TablePaginationProps {
	/** Current page index (0-based) */
	pageIndex: number;

	/** Number of items per page */
	pageSize: number;

	/** Total number of records */
	totalCount: number;

	/** Callback when page index changes */
	onPageChange: (newPageIndex: number) => void;

	/** Callback when page size changes */
	onPageSizeChange: (newPageSize: number) => void;
}

/**
 * Pagination component for tables, with page size selector and navigation buttons.
 */
const TablePagination: React.FC<TablePaginationProps> = ({
	pageIndex,
	pageSize,
	totalCount,
	onPageChange,
	onPageSizeChange,
}) => {
	const pageCount = useMemo(
		() => Math.ceil(totalCount / pageSize),
		[totalCount, pageSize]
	);

	return (
		<PaginationContainer>
			<MuiSelect
				value={pageSize}
				onChange={(e) => onPageSizeChange(Number(e.target.value))}
			>
				{[10, 20, 30, 40, 50].map((size) => (
					<MenuItem key={size} value={size}>
						Show {size}
					</MenuItem>
				))}
			</MuiSelect>

			<PaginationButtonsContainer>
				<PageInfo>
					Page {pageIndex + 1} of {pageCount}
				</PageInfo>

				<PaginationButton
					onClick={() => onPageChange(0)}
					disabled={pageIndex === 0}
				>
					<KeyboardDoubleArrowLeftIcon fontSize="small" />
				</PaginationButton>

				<PaginationButton
					onClick={() => onPageChange(pageIndex - 1)}
					disabled={pageIndex === 0}
				>
					<KeyboardArrowLeftIcon fontSize="small" />
				</PaginationButton>

				<PaginationButton
					onClick={() => onPageChange(pageIndex + 1)}
					disabled={pageIndex >= pageCount - 1}
				>
					<KeyboardArrowRightIcon fontSize="small" />
				</PaginationButton>

				<PaginationButton
					onClick={() => onPageChange(pageCount - 1)}
					disabled={pageIndex >= pageCount - 1}
				>
					<KeyboardDoubleArrowRightIcon fontSize="small" />
				</PaginationButton>
			</PaginationButtonsContainer>
		</PaginationContainer>
	);
};

export default TablePagination;
