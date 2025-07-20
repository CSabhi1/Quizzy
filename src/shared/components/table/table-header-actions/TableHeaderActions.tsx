/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
	CustomButtonContainer,
	FilterContainer,
	HeaderActionsContainer,
	MuiSelect,
	MuiTextField,
	SearchContainer,
	SearchTextContainer,
} from "./TableHeaderActions.style";
import { MenuItem } from "@mui/material";

interface TableHeaderActionsProps {
	columns: any[];
	selectedColumn: string;
	onColumnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	search: string;
	onSearchChange: (value: string, selectedColumn: string) => void;
	filterComp?: React.ReactNode;
	buttons?: React.ReactNode;
	extraHeaderFields?: React.ReactNode;
}

const TableHeaderActions: React.FC<TableHeaderActionsProps> = ({
	columns,
	selectedColumn,
	onColumnChange,
	search,
	onSearchChange,
	filterComp,
	buttons,
	extraHeaderFields,
}) => {
	return (
		<HeaderActionsContainer className="header-actions">
			{extraHeaderFields}
			<SearchContainer className="search">
				<MuiSelect
					value={selectedColumn}
					onChange={(e: any) => {
						onColumnChange(e);
					}}
				>
					{columns?.map((col: any) =>
						col?.isSearch ? (
							<MenuItem key={col?.accessorKey} value={col.accessorKey}>
								{col.header as string}
							</MenuItem>
						) : null
					)}
				</MuiSelect>

				<SearchTextContainer>
					<MuiTextField
						variant="outlined"
						size="small"
						placeholder="Search..."
						value={search}
						onChange={(e) => onSearchChange(e.target.value, selectedColumn)}
						sx={{ minWidth: 200 }}
					/>
					<i className="fa-solid fa-magnifying-glass" />
				</SearchTextContainer>
			</SearchContainer>

			{filterComp && <FilterContainer>{filterComp}</FilterContainer>}
			{buttons && <CustomButtonContainer>{buttons}</CustomButtonContainer>}
		</HeaderActionsContainer>
	);
};

export default TableHeaderActions;
