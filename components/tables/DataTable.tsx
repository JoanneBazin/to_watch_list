"use client";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import DeleteLogo from "../layout/DeleteLogo";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Item } from "@/lib/types";
import { useState } from "react";

interface DataTableProps {
  data: Item[];
  onModify: () => void;
  entry: string;
}

export function DataTable({ data, onModify, entry }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "title",
      header: "Titre",
    },
    {
      accessorKey: "addedAt",
      header: "Ajouté le",
    },
    {
      accessorKey: "categoryName",
      header: "Catégorie",
    },

    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsAllPageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="opacity-0 group-hover:opacity-50"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="opacity-0 group-hover:opacity-50"
        />
      ),
    },
    {
      id: "delete",
      cell: ({ row }) => (
        <Button
          variant="outline"
          className="bg-zinc-500"
          onClick={() => handleDelete(row.original)}
        >
          <DeleteLogo />
        </Button>
      ),
    },
  ];

  const handleDelete = async (row: Item) => {
    try {
      const response = await fetch(`/api/${entry}s/${row.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      onModify();
    } catch (error) {
      console.log(error);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getCoreRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <HoverCard key={row.id}>
                <HoverCardTrigger asChild>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-1">
                    <h5 className="font-bold my-1">{row.original.title}</h5>
                    {row.original.real && (
                      <p className="font-semibold">{row.original.real}</p>
                    )}
                    {row.original.year && (
                      <p className="text-xs">{row.original.year}</p>
                    )}
                    {row.original.synopsis && (
                      <p className="text-gray-500">{row.original.synopsis}</p>
                    )}
                    {row.original.platform && (
                      <p className="italic">
                        Disponible sur {row.original.platform}
                      </p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
