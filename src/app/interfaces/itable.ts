import { TableInstance, TableState } from "react-table";

export interface TableStateWithPagination<T extends object>
  extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

export interface TableInstanceWithPagination<T extends object>
  extends TableInstance<T> {
  page: T[];
  pageCount: number;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  state: TableStateWithPagination<T>;
}
