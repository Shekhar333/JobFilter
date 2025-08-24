"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  Row,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Check,
  X,
  Search,
} from "lucide-react";
import { Candidate } from "@/types/candidate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatSalary, calculateCandidateScore } from "@/lib/utils";

interface CandidatesTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidateId: string) => void;
  onUnselectCandidate: (candidateId: string) => void;
  onViewCandidate: (candidate: Candidate) => void;
}

export function CandidatesTable({
  candidates,
  onSelectCandidate,
  onUnselectCandidate,
  onViewCandidate,
}: CandidatesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "score", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns: ColumnDef<Candidate>[] = useMemo(
    () => [
      {
        id: "select",
        header: "Select",
        cell: ({ row }) => {
          const candidate = row.original;
          return (
            <div className="flex items-center justify-center">
              {candidate.isSelected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUnselectCandidate(candidate.id)}
                  className="h-8 w-8 p-0 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectCandidate(candidate.id)}
                  className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200"
                ></Button>
              )}
            </div>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold hover:bg-transparent"
            >
              Name
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const candidate = row.original;
          return (
            <div className="space-y-1">
              <div className="font-medium">{candidate.name}</div>
              <div className="text-sm text-gray-500">{candidate.email}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "location",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold hover:bg-transparent"
            >
              Location
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: "work_availability",
        header: "Availability",
        cell: ({ row }) => {
          return (
            <div className="flex flex-wrap gap-1">
              {row.original.work_availability.map((availability) => (
                <Badge
                  key={availability}
                  variant="secondary"
                  className="text-xs"
                >
                  {availability}
                </Badge>
              ))}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return row.original.work_availability.some((availability) =>
            value.includes(availability)
          );
        },
      },
      {
        accessorKey: "annual_salary_expectation",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold hover:bg-transparent"
            >
              Salary Expectation
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const expectations = row.original.annual_salary_expectation;
          return (
            <div className="text-sm">
              {expectations["full-time"] && (
                <div className="text-xs">
                  Full-time: {formatSalary(expectations["full-time"])}
                </div>
              )}
              {expectations["part-time"] && (
                <div className="text-xs">
                  Part-time: {formatSalary(expectations["part-time"])}
                </div>
              )}
            </div>
          );
        },
        sortingFn: (rowA, rowB) => {
          const salaryA =
            rowA.original.annual_salary_expectation["full-time"] || "0";
          const salaryB =
            rowB.original.annual_salary_expectation["full-time"] || "0";
          return (
            parseInt(salaryA.replace(/[$,]/g, "")) -
            parseInt(salaryB.replace(/[$,]/g, ""))
          );
        },
      },
      {
        accessorKey: "education",
        header: "Education",
        cell: ({ row }) => {
          const education = row.original.education;
          const isTop50 = education.degrees.some((d) => d.isTop50);
          return (
            <div className="space-y-1">
              <div className="text-sm font-medium">
                {education.highest_level}
              </div>
              {isTop50 && (
                <Badge variant="default" className="text-xs">
                  Top 50
                </Badge>
              )}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.original.education.highest_level);
        },
      },
      {
        accessorKey: "work_experiences",
        header: "Experience",
        cell: ({ row }) => {
          const experiences = row.original.work_experiences;
          return (
            <div className="space-y-1">
              <div className="text-sm font-medium">
                {experiences.length} role{experiences.length !== 1 ? "s" : ""}
              </div>
              <div className="text-xs text-gray-500">
                {experiences.slice(0, 2).map((exp, index) => (
                  <div key={index}>{exp.company}</div>
                ))}
                {experiences.length > 2 && (
                  <div>+{experiences.length - 2} more</div>
                )}
              </div>
            </div>
          );
        },
        sortingFn: (rowA, rowB) => {
          return (
            rowA.original.work_experiences.length -
            rowB.original.work_experiences.length
          );
        },
      },
      {
        accessorKey: "skills",
        header: "Skills",
        cell: ({ row }) => {
          const skills = row.original.skills;
          return (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          );
        },
        filterFn: (row, id, value) => {
          return row.original.skills.some((skill) =>
            value.some((filterSkill: string) =>
              skill.toLowerCase().includes(filterSkill.toLowerCase())
            )
          );
        },
      },
      {
        id: "score",
        accessorFn: (row) => calculateCandidateScore(row),
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="h-auto p-0 font-semibold hover:bg-transparent"
            >
              Score
              {column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          );
        },
        cell: ({ row }) => {
          const score = calculateCandidateScore(row.original);
          return (
            <div className="text-center flex items-center justify-center">
              <div className="font-medium">{score}</div>
            </div>
          );
        },
        sortingFn: (rowA, rowB) => {
          return (
            calculateCandidateScore(rowA.original) -
            calculateCandidateScore(rowB.original)
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewCandidate(row.original)}
              className="h-8"
            >
              <Eye className="h-4 w-4" />
            </Button>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      },
    ],
    [onSelectCandidate, onUnselectCandidate, onViewCandidate]
  );

  const table = useReactTable({
    data: candidates,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
      sorting: [{ id: "score", desc: true }],
    },
  });

  return (
    <div className="w-full">
      {/* Quick Search */}
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
            <Search className="h-4 w-4 text-white" />
          </div>
          <Input
            placeholder="Quick search in current view..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-md bg-white shadow-sm border-gray-200 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[calc(100vh-20rem)]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gradient-to-r from-slate-100 to-slate-200 border-b-2 border-purple-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-left font-semibold text-slate-700 border-r last:border-r-0 bg-gradient-to-br from-white/50 to-gray-50/50 backdrop-blur-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200",
                    row.original.isSelected &&
                      "bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 shadow-sm",
                    index % 2 === 0 && "bg-slate-50/50"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-3 py-3 border-r last:border-r-0 align-top"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl">🔍</div>
                    <div>No candidates match your filters</div>
                    <div className="text-xs">
                      Try adjusting your search criteria
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 font-medium">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
