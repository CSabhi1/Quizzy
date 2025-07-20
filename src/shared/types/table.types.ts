/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

export type ExtendedColumnDef<T> = ColumnDef<T> & {
	isSearch?: boolean;
	accessorKey: string;
	enableSorting?: boolean;
	className?: string;
	isFilter?: boolean;
	filterBody?: any;
};
