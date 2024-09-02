"use client";
import { useMemo, useEffect, useState } from "react";
import { useTable, usePagination, TableState, Column } from "react-table";
import { useTheme } from "./hooks/use-theme";
import useGetProducts from "./hooks/use-get-products";
import ReactPaginate from "react-paginate";

import { IProduct } from "./interfaces/iproduct";
import { TableInstanceWithPagination } from "./interfaces/itable";

import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { ThemeButton } from "./components/core/ThemeButton";
import { TablePlaceHolder } from "./components/ui/TablePlaceHolder";

import { COLORS_DARK, COLORS_LIGHT } from "./constants/colors";
import Image from "next/image";

export default function Home() {
  const { theme } = useTheme();
  const { productsItems, loading, fetchProducts, deleteProduct } =
    useGetProducts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage: number = 10;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProducts(query);
  };

  const handleDelete = (trackingId: number) => {
    deleteProduct(trackingId);
  };

  const columns: Column<IProduct>[] = useMemo(
    () => [
      { Header: "Tracking ID", accessor: "trackingId" as const },
      {
        Header: "Product Name",
        accessor: "productName" as const,
        Cell: ({ row }: { row: { original: IProduct } }) => (
          <div className='flex items-center'>
            <Image
              src={row.original.productImage}
              alt={row.original.productName}
              width={40}
              height={40}
              className='w-10 h-10 object-cover mr-4 rounded-xl'
            />
            <span>{row.original.productName}</span>
          </div>
        ),
      },
      { Header: "Customer", accessor: "customer" as const },
      {
        Header: "Date",
        accessor: "date" as const,
        Cell: ({ value }: { value: Date }) => value.toLocaleDateString(),
      },
      {
        Header: "Amount",
        accessor: "amount" as const,
        Cell: ({ value }: { value: number }) => `$${value}`,
      },
      { Header: "Payment Mode", accessor: "paymentMode" as const },
      {
        Header: "Status",
        accessor: "status" as const,
        Cell: ({ value }: { value: string }) => {
          let statusClass = "";

          switch (value) {
            case "Cancelled":
              statusClass = "text-[#ab2125] bg-[#fbe7e8] ";
              break;
            case "Delivered":
              statusClass = "text-[#2f9a61] bg-[#ebf9f1] ";
              break;
            case "Process":
              statusClass = "text-[#d16d12] bg-[#fef2e5] ";
              break;
            default:
              statusClass = "text-gray-500";
              break;
          }

          return (
            <span
              className={`p-2 rounded-xl flex items-center justify-center w-[100px] ${statusClass}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "actions" as const,
        Cell: ({ row }: { row: { original: IProduct } }) => (
          <div className='flex items-center justify-center gap-3'>
            <button className='text-blue-400 duration-300 hover:text-blue-600 active:text-blue-200'>
              <ModeOutlinedIcon />
            </button>
            <button
              className='text-red-500 duration-300 hover:text-red-700 active:text-red-200'
              onClick={() => handleDelete(row.original.trackingId)}
            >
              <DeleteForeverOutlinedIcon />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => productsItems, [productsItems]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    gotoPage,
    state: { pageIndex },
  } = useTable<IProduct>(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: itemsPerPage,
      } as Partial<TableState<IProduct>> & {
        pageIndex: number;
        pageSize: number;
      },
    },
    usePagination
  ) as TableInstanceWithPagination<IProduct>;

  const calculatedPageCount = Math.ceil(productsItems.length / itemsPerPage);

  useEffect(() => {
    if (pageIndex !== 0) {
      gotoPage(0);
    }
  }, [productsItems, gotoPage]);

  return (
    <main
      className={`flex flex-col min-h-screen w-full pt-4 pb-4`}
      style={{
        backgroundColor:
          theme === COLORS_LIGHT
            ? COLORS_DARK.APP_BACKGROUND
            : COLORS_LIGHT.APP_BACKGROUND,
        color:
          theme === COLORS_LIGHT
            ? COLORS_DARK.FONT_MAIN
            : COLORS_LIGHT.FONT_MAIN,
      }}
    >
      <div className='flex w-full items-center justify-between pr-4 pl-4 mb-2'>
        <div className='relative'>
          <SearchIcon className='absolute left-2 top-1/2 transform -translate-y-1/2' />
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearch}
            className={`outline outline-2 rounded-lg pt-2 pb-2 pl-10 pr-4`}
            style={{
              backgroundColor:
                theme === COLORS_LIGHT
                  ? COLORS_DARK.APP_BACKGROUND
                  : COLORS_LIGHT.APP_BACKGROUND,
              outlineColor:
                theme === COLORS_LIGHT
                  ? COLORS_DARK.BORDER
                  : COLORS_LIGHT.BORDER,
            }}
          />
        </div>
        <ThemeButton />
      </div>
      <div className='flex-grow w-full'>
        <table
          className='min-w-full border-collapse'
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...restProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr
                  key={key}
                  {...restProps}
                >
                  {headerGroup.headers.map((column) => {
                    const { key, ...restProps } = column.getHeaderProps();
                    return (
                      <th
                        key={key}
                        className='px-4 py-2 text-left'
                        {...restProps}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              <TablePlaceHolder />
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='text-center py-4'
                >
                  No products found
                </td>
              </tr>
            ) : (
              rows
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((row, index) => {
                  prepareRow(row);
                  const { key, ...restProps } = row.getRowProps();
                  const rowClass =
                    index % 2 === 0
                      ? theme === COLORS_LIGHT
                        ? COLORS_DARK.ROW_1
                        : COLORS_LIGHT.ROW_1
                      : theme === COLORS_LIGHT
                      ? COLORS_DARK.ROW_2
                      : COLORS_LIGHT.ROW_2;

                  return (
                    <tr
                      style={{ backgroundColor: `${rowClass}` }}
                      key={key}
                      className={`rounded-lg`}
                      {...restProps}
                    >
                      {row.cells.map((cell) => {
                        const { key, ...restProps } = cell.getCellProps();

                        return (
                          <td
                            key={key}
                            className='px-4 py-2'
                            {...restProps}
                          >
                            {cell.column.id === "trackingId"
                              ? `# ${String(cell.value)}`
                              : cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>

      <div className='mt-auto'>
        <ReactPaginate
          previousLabel={<ArrowBackIosNewOutlinedIcon />}
          nextLabel={<ArrowForwardIosOutlinedIcon />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={calculatedPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => gotoPage(selected)}
          containerClassName='flex items-center justify-center gap-4'
          pageLinkClassName={`pr-1 pl-1`}
          activeClassName='bg-blue-500 text-white rounded-lg'
        />
      </div>
    </main>
  );
}
