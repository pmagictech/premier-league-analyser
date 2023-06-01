import { RowSelectionState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { Team } from "@src/types";

interface TableProps {
  teams: Team[];
  selectedTeams: Team[];
  onSelectTeam: (team: Team, checked: boolean) => void;
}

export default function Table({ teams, selectedTeams, onSelectTeam }: TableProps) {
  const columns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "position",
      },
      {
        header: "Club",
        accessorKey: "club",
        cell: ({ getValue }: any) => <b>{getValue()}</b>,
      },
      {
        header: "Played",
        accessorKey: "played",
      },
      {
        header: "Drawn",
        accessorKey: "drawn",
      },
      {
        header: "Lost",
        accessorKey: "lost",
      },
      {
        header: "GD",
        accessorKey: "gd",
      },
      {
        header: "Points",
        accessorKey: "points",
        cell: ({ getValue }: any) => <b>{getValue()}</b>,
      },
    ],
    []
  );

  const data = useMemo(() => teams, [teams]);

  const rowSelection = useMemo(() => {
    const selections: RowSelectionState = {};
    selectedTeams.forEach((team) => (selections[data.findIndex(({ club }) => team.club == club)] = true));

    return selections;
  }, [selectedTeams, data]);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    state: {
      rowSelection,
    },
  });

  return (
    <table className="border-collapse w-full bg-white dark:bg-slate-800 text-sm shadow-md shadow-slate-300">
      <thead className="">
        {getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="font-semibold p-5 text-slate-900 dark:text-slate-200 text-left"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map((row) => {
          let className = "text-slate-500 dark:text-slate-400";

          if (row.getIsSelected()) className = "bg-blue-600 text-white";
          else if (row.original.position <= 4) className = "bg-blue-100";
          else if (row.original.position >= 18) className = "bg-red-100";

          return (
            <tr
              key={row.id}
              className={`border-t border-t-slate-300 dark:border-t-slate-400 hover:bg-slate-100 hover:text-black cursor-pointer ${className}`}
              onClick={() => onSelectTeam(row.original, row.getIsSelected())}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
