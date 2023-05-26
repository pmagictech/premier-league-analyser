import { useMemo } from "react";
import { CellProps, Column, useTable } from "react-table";

import { Team } from "@src/types";

interface TableProps {
  teams: Team[];
  selectedTeams: Team[];
  selectTeam: (team: Team, checked: boolean) => void;
}

export default function Table({ teams, selectedTeams, selectTeam }: TableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "club",
        id: "checkbox",
        Cell: ({ row, value }: CellProps<any, string>) => {
          return (
            <input
              type="checkbox"
              checked={selectedTeams.map(({ club }: any) => club).includes(value)}
              onChange={(e) => selectTeam(row.original, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
          );
        },
      },
      {
        Header: "#",
        accessor: "position",
      },
      {
        Header: "Club",
        accessor: "club",
      },
      {
        Header: "Played",
        accessor: "played",
      },
      {
        Header: "Drawn",
        accessor: "drawn",
      },
      {
        Header: "Lost",
        accessor: "lost",
      },
      {
        Header: "GD",
        accessor: "gd",
      },
      {
        Header: "Points",
        accessor: "points",
        Cell: ({ value }: CellProps<any, string>) => <b>{value}</b>,
      },
    ],
    [selectTeam, selectedTeams]
  ) as Column<Team>[];

  const data = useMemo(() => teams, [teams]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table
      className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm"
      {...getTableProps()}
    >
      <thead className="bg-slate-50 dark:bg-slate-700">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
