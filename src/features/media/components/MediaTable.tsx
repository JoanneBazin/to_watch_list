"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { format } from "date-fns";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { BiSolidEditAlt } from "react-icons/bi";

import EditMedia from "./EditMedia";
import { MediaItem, MediaTableProps } from "@/src/types";
import {
  useDeleteFromWatchlist,
  useToggleWatched,
} from "@/src/features/media/hooks/useWatchlistMutations";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui";
import ShareMedia from "../../suggestions/components/ShareMedia";
import { MediaCard } from "./MediaCard";
import { MediaCardSuggestions } from "./MediaCardSuggestions";
import { handleError } from "@/src/utils/errorHandlers";

export const MediaTable = ({ data, type }: MediaTableProps) => {
  const { deleteMedia, isDeletingMedia, deleteError } =
    useDeleteFromWatchlist();
  const { toggleWatched, isTogglingWatched, toggleError } = useToggleWatched();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setError(null);

    try {
      await deleteMedia(id);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const handleToggleWatched = async (id: string) => {
    setError(null);

    try {
      await toggleWatched(id);
    } catch (error) {
      handleError(error, setError);
    }
  };

  const columns: ColumnDef<MediaItem>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        return (
          <MediaCard media={row.original}>
            {row.original.suggestions && (
              <MediaCardSuggestions suggestions={row.original.suggestions} />
            )}
          </MediaCard>
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
          onClick={() => handleToggleWatched(row.original.id)}
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
          onClick={() => handleDelete(row.original.id)}
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

          <EditMedia row={row.original} />
        </Dialog>
      ),
    },

    {
      id: "suggest",
      cell: ({ row }) => <ShareMedia media={row.original} />,
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
};
