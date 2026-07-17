import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import ActionColumn from "@/components/shared/city/ActionColumn";
import { CountryBadge } from "@/components/shared/city/CountryBadge";
import { TimezoneBadge } from "@/components/shared/city/TimezoneBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { citiesQueryOptions, countriesQueryOptions } from "@/routes/city";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CityData } from "./_types";
import { cn } from "@/lib/utils";
import CityHeader from "@/components/shared/city/CityHeader";

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <span className="ml-1 text-[10px] text-white">↑</span>;
  }
  if (direction === "desc") {
    return <span className="ml-1 text-[10px] text-white">↓</span>;
  }
  return <span className="ml-1 text-[10px] text-white">↕</span>;
}

// ─── Column Definitions ───────────────────────────────────────────────────────

const columns: ColumnDef<CityData>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => (
      <span className="tabular-nums text-sm font-medium text-black dark:text-white">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-0.5 text-white hover:text-black/80 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        City Name <SortIcon direction={column.getIsSorted()} />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-black dark:text-white">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "cityCode",
    header: ({ column }) => (
      <button
        className="flex items-center gap-0.5 text-white hover:text-black/80 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        City Code <SortIcon direction={column.getIsSorted()} />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-mono text-sm font-semibold text-black dark:text-white tracking-widest">
        {row.getValue("cityCode")}
      </span>
    ),
  },
  {
    accessorKey: "countryName",
    header: ({ column }) => (
      <button
        className="flex items-center gap-0.5 text-white hover:text-black/80 transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country <SortIcon direction={column.getIsSorted()} />
      </button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <CountryBadge code={row.original.countryCode} />
        <span className="text-sm text-black dark:text-white">
          {row.getValue("countryName")}
        </span>
      </div>
    ),
    // filter by countryCode stored on the row
    filterFn: (row, _id, value: string) => row.original.countryCode === value,
  },
  {
    accessorKey: "timeZoneOffset",
    header: "Timezone",
    cell: ({ row }) => (
      <TimezoneBadge offset={row.getValue("timeZoneOffset")} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionColumn row={row} />,
  },
];

const PAGE_SIZES = [10, 20, 50, 100];

// ─── Main Component ───────────────────────────────────────────────────────────

const City = () => {
  const {
    data: cityList,
    // isLoading,
    // isError,
  } = useSuspenseQuery(citiesQueryOptions);

  const { data: countryList } = useSuspenseQuery(countriesQueryOptions);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pageSize, setPageSize] = React.useState(10); // default page size

  const table = useReactTable({
    data: cityList?.content || [],
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
    table.setPageIndex(0);
  }, [pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const { pageIndex } = table.getState().pagination;
  const filteredTotal = table.getFilteredRowModel().rows.length;
  const start = filteredTotal === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, filteredTotal);

  const activeCountryFilter = table
    .getColumn("countryName")
    ?.getFilterValue() as string | undefined;

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col text-white px-6 md:px-10 md:py-9 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-7 flex-1 min-h-0">
        <CityHeader cityList={cityList} />

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3 ">
          {/* Search */}
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-black/50 dark:text-white/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <Input
              placeholder="Search city..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              className="h-9 w-56 rounded-lg border border-zinc-900/20 dark:border-white/10 bg-gray-100/10 dark:bg-white/5 pl-9 text-sm text-black dark:text-white dark:placeholder:text-white/30 dark:focus-visible:border-white/20 focus-visible:ring-white/10"
            />
          </div>

          {/* Country quick-filters */}
          <div className="flex items-center gap-1.5">
            {countryList.map(({ countryCode: code, countryName: label }) => {
              const isActive = activeCountryFilter === code;
              return (
                <button
                  key={code}
                  onClick={() =>
                    table
                      .getColumn("countryName")
                      ?.setFilterValue(isActive ? undefined : code)
                  }
                  className={cn(
                    "inline-flex items-center rounded-md border px-3 py-1 text-xs font-medium transition-all cursor-pointer duration-300",
                    isActive
                      ? "bg-gray-500  dark:bg-white/10 text-white border-white/20 hover:bg-gray-700 dark:hover:bg-white/20"
                      : "bg-gray-200 dark:bg-transparent text-zinc-900 dark:text-white/50 border-white/10 hover:bg-gray-300  dark:hover:bg-white/5",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="max-h-[calc(100vh-24rem)] flex flex-col">
          <ScrollArea className="flex-1 h-0 ">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow
                    key={hg.id}
                    className="sticky top-0 z-10 border-b border-white/8 text-white duration-300 bg-gray-800 hover:bg-gray-900 dark:bg-zinc-900 dark:hover:bg-[#1a1a1a]"
                  >
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="h-11 px-5 text-[11px] font-semibold uppercase tracking-widest text-white "
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b border-gray-200 dark:border-white/10 bg-gray-100/20 dark:bg-transparent transition-colors text-black dark:text-white hover:bg-gray-300/20 dark:hover:bg-white/2.5 cursor-default"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-5 py-4 text-black dark:text-white text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length}
                      className="h-48 text-center"
                    >
                      <div className="flex flex-col items-center gap-3 text-black dark:text-white/20">
                        <svg
                          className="size-9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.25"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                        </svg>
                        <span className="text-sm">No cities found.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* ── Footer / Pagination ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-1">
          <div className="flex items-center gap-2.5 text-sm text-white/40">
            <span>Display lines per page</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="appearance-none cursor-pointer rounded-lg border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 pr-8 text-sm text-white/70 outline-none hover:bg-white/[0.08] focus:border-white/20 transition-colors"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                    {s}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-white/30"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M4 6l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="tabular-nums text-white/40">
              {filteredTotal === 0 ? "0" : `${start}–${end}`} of {filteredTotal}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 px-4 text-sm text-white/50 hover:text-white hover:bg-white/[0.06] disabled:text-white/20 disabled:hover:bg-transparent rounded-lg"
              >
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 px-4 text-sm text-white/50 hover:text-white hover:bg-white/[0.06] disabled:text-white/20 disabled:hover:bg-transparent rounded-lg"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
