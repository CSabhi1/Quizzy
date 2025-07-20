/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
	flexRender,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { ExtendedColumnDef } from "@app/shared/types/table.types";

import sortIcon from "@app/assets/images/sort-default-icon.svg";
import sortIocnDec from "@app/assets/images/sort-dec-icon.svg";
import sortIconAsc from "@app/assets/images/sort-asc-icon.svg";

import {
	MuiTableContainer,
	MuiTable,
	MuiTableHead,
	MuiTableRow,
	MuiTableCell,
	SortIconWrapper,
	MuiTableBody,
	MuiTableRowBody,
	MuiTableCellBody,
} from "./Table.styles";
import { Box } from "@mui/material";
import TablePagination from "./table-pagination/TablePagination";
import TableHeaderActions from "./table-header-actions/TableHeaderActions";
import { RootState } from "@app/redux/store";
import { useSelector } from "react-redux";

interface QueryState {
	pageIndex: number;
	pageSize: number;
	sorting: { field: string; order: "asc" | "desc" } | null;
	search: string;
	searchField: string;
	// Optionally, you can include filters here.
}

interface TableProps {
	columns: ColumnDef<any>[];
	tableData: any;
	loading: boolean;
	fetchData: (params: {
		page: number;
		pageSize: number;
		sortField?: string;
		sortOrder?: "asc" | "desc";
		searchText?: string;
		searchField?: string;
		filter?: any;
		userId: string;
	}) => Promise<{ data: any[]; totalCount: number }>;
	filterComp?: React.ReactNode;
	filterData?: any;
	onRowClick?: (row: any) => void;
	extraHeaderFields?: React.ReactNode;
	buttons?: React.ReactNode;
}

function Table({
	columns,
	tableData,
	loading,
	fetchData,
	filterComp,
	filterData,
	onRowClick,
	extraHeaderFields,
	buttons,
}: TableProps) {
	const { user } = useSelector((state: RootState) => state.auth);
	const [selectedColumn, setSelectedColumn] = useState<string>(
		(
			columns.find(
				(col) => (col as ExtendedColumnDef<any>).isSearch
			) as ExtendedColumnDef<any>
		)?.accessorKey
	);

	const handleColumnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedColumn(event.target.value);
	};

	// Internal query state for pagination, sorting, and search.
	const [query, setQuery] = useState<QueryState>({
		pageIndex: 0,
		pageSize: 10,
		sorting: null,
		search: "",
		searchField: "",
	});

	// Fetch data when query changes.
	useEffect(() => {
		if (!user?.uid) return;
		fetchData({
			page: query.pageIndex + 1,
			pageSize: query.pageSize,
			searchText: query.search,
			searchField: query.searchField,
			sortField: query.sorting ? query.sorting.field : undefined,
			sortOrder: query.sorting ? query.sorting.order : undefined,
			userId: user?.uid,
		});
	}, [query, filterData]);

	// Configure React Table.
	const table = useReactTable({
		columns,
		data: tableData?.data,
		manualPagination: true,
		manualSorting: true,
		pageCount: Math.ceil(tableData?.totalCount / query.pageSize),
		state: {
			pagination: { pageIndex: query.pageIndex, pageSize: query.pageSize },
			sorting: query.sorting
				? [{ id: query.sorting.field, desc: query.sorting.order === "desc" }]
				: [],
		},
		onPaginationChange: (newPagination) =>
			setQuery((prev) => ({ ...prev, ...newPagination })),
		onSortingChange: (updater) => {
			const currentSorting = query.sorting
				? [{ id: query.sorting.field, desc: query.sorting.order === "desc" }]
				: [];
			const newSorting =
				typeof updater === "function" ? updater(currentSorting) : updater;
			setQuery((prev) => ({
				...prev,
				sorting:
					newSorting.length > 0
						? {
								field: newSorting[0].id,
								order: newSorting[0].desc ? "desc" : "asc",
						  }
						: null,
			}));
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="table-wrapper">
			<TableHeaderActions
				columns={columns}
				selectedColumn={selectedColumn}
				onColumnChange={handleColumnSelect}
				search={query.search}
				onSearchChange={(value, selected) =>
					setQuery((prev) => ({
						...prev,
						search: value,
						searchField: selected,
						pageIndex: 0,
					}))
				}
				filterComp={filterComp}
				buttons={buttons}
				extraHeaderFields={extraHeaderFields}
			/>

			<MuiTableContainer className="table-container">
				<MuiTable>
					<MuiTableHead>
						{table.getHeaderGroups().map((headerGroup) => (
							<MuiTableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<MuiTableCell
										key={header.id}
										colSpan={header.colSpan}
										sx={{
											cursor: header.column.columnDef.enableSorting
												? "pointer"
												: "default",
										}}
										onClick={
											header.column.columnDef.enableSorting
												? header.column.getToggleSortingHandler()
												: undefined
										}
										className={(header.column.columnDef as any).className || ""}
									>
										<Box
											sx={{ width: "max-content", display: "flex" }}
											className="th-container"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											<Box>
												{header.column.columnDef.enableSorting &&
													({
														asc: (
															<SortIconWrapper component="span">
																<img
																	style={{ marginTop: "4px" }}
																	src={sortIconAsc}
																	alt=""
																/>
															</SortIconWrapper>
														),
														desc: (
															<SortIconWrapper component="span">
																<img
																	style={{ marginTop: "4px" }}
																	src={sortIocnDec}
																	alt=""
																/>
															</SortIconWrapper>
														),
														false: (
															<SortIconWrapper component="span">
																<img
																	style={{ marginTop: "4px" }}
																	src={sortIcon}
																	alt=""
																/>
															</SortIconWrapper>
														),
													}[header.column.getIsSorted() as string] ??
														null)}
											</Box>
										</Box>
									</MuiTableCell>
								))}
							</MuiTableRow>
						))}
					</MuiTableHead>

					{loading && "loading"}
					{!loading && (
						<MuiTableBody>
							{table.getRowModel().rows.map((row) => (
								<MuiTableRowBody
									key={row.id}
									clickable={onRowClick ? true : false}
									onClick={
										onRowClick ? () => onRowClick(row.original) : undefined
									}
								>
									{row.getVisibleCells().map((cell) => (
										<MuiTableCellBody key={cell.id}>
											<Box
											// sx={{ width: "max-content" }}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</Box>
										</MuiTableCellBody>
									))}
								</MuiTableRowBody>
							))}
						</MuiTableBody>
					)}
				</MuiTable>
			</MuiTableContainer>
			<br />
			<TablePagination
				pageIndex={query.pageIndex}
				pageSize={query.pageSize}
				totalCount={tableData?.totalCount || 0}
				onPageChange={(newPageIndex) =>
					setQuery((prev) => ({ ...prev, pageIndex: newPageIndex }))
				}
				onPageSizeChange={(newPageSize) =>
					setQuery((prev) => ({
						...prev,
						pageSize: newPageSize,
						pageIndex: 0,
					}))
				}
			/>
		</div>
	);
}

export default Table;
