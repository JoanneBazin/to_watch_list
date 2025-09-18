"use client";

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
import { Item } from "@/lib/types";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";

import { useFetchFriends } from "../hooks/useFetchFriends";
import ShareEntry from "../actions/suggestions/ShareEntry";
import MediaHoverCard from "../layout/MediaHoverCard";
import EditMedia from "../actions/forms/EditMedia";
import { Dialog, DialogTrigger } from "../ui/dialog";

interface DataTableProps {
  data: Item[];

  onModify: () => void;
}

export function DataTable({ data, onModify }: DataTableProps) {
  const { friends } = useFetchFriends();

  const handleDelete = async (row: Item) => {
    try {
      const response = await fetch(`/api/media/${row.id}`, {
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

  const handleWatched = async (row: Item) => {
    const toggleWatched = !row.watched;

    try {
      const response = await fetch(`/api/media/${row.id}/user`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ watched: toggleWatched }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }
      onModify();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: ColumnDef<Item>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        return (
          <Dialog key={row.id}>
            <DialogTrigger asChild>
              <div className="cursor-pointer font-bold">
                {row.original.title}
              </div>
            </DialogTrigger>
            <MediaHoverCard row={row.original} />
          </Dialog>
        );
      },
    },
    {
      accessorKey: "addedAt",
      header: "Ajouté le",
      cell: ({ getValue }) =>
        format(new Date(getValue() as Date), "dd-MM-yyyy"),
    },
    {
      accessorKey: "categoryName",
      header: "Catégorie",
    },

    {
      accessorKey: "watched",
      header: "",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleWatched(row.original)}
          className={
            row.original.watched
              ? "bg-zinc-900 hover:bg-zinc-800 border-black"
              : ""
          }
        >
          <FaCheck />
        </Button>
      ),
    },

    {
      id: "delete",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleDelete(row.original)}
          className={
            row.original.watched
              ? "bg-zinc-900 hover:bg-zinc-800 border-black"
              : ""
          }
        >
          <RxCross1 />
        </Button>
      ),
    },

    {
      id: "edit",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={
                row.original.watched
                  ? "bg-zinc-900 hover:bg-zinc-800 border-black"
                  : ""
              }
            >
              <BiSolidEditAlt />
            </Button>
          </DialogTrigger>

          <EditMedia row={row.original} onModify={onModify} />
        </Dialog>
      ),
    },

    {
      id: "suggest",
      cell: ({ row }) => <ShareEntry row={row.original} friends={friends} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
              <TableRow
                key={row.id}
                className={
                  row.original.watched
                    ? "bg-zinc-900 text-zinc-700 italic"
                    : "hover:bg-muted/50"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
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
