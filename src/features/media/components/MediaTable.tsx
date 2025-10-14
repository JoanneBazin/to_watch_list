"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { MediaItem } from "@/src/types";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui";
import { MediaCard } from "./MediaCard";
import { MediaCardSuggestions } from "./MediaCardSuggestions";
import { MediaOptions } from "./MediaOptions";
import ShareMediaDialog from "../../suggestions/components/ShareMediaDialog";
import { ToggleWatchedButton } from "./ToggleWatchedButton";
import { DeleteMediaButton } from "./DeleteMediaButton";
import { EditMediaDialog } from "./EditMediaDialog";

type MediaColumnMeta = {
  className?: string;
};

type MediaColumnDef<TData extends MediaItem> = ColumnDef<TData, any> & {
  meta?: MediaColumnMeta;
};

export const MediaTable = ({ data }: { data: MediaItem[] }) => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const columns: MediaColumnDef<MediaItem>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        return (
          <MediaCard media={row.original}>
            {row.original.suggestions &&
              row.original.suggestions.length > 0 && (
                <MediaCardSuggestions suggestions={row.original.suggestions} />
              )}
          </MediaCard>
        );
      },
      meta: {
        className: "w-4/5",
      },
    },
    {
      accessorKey: "addedAt",
      header: "Ajouté le",
      cell: ({ getValue }) =>
        format(new Date(getValue() as Date), "dd-MM-yyyy"),
      meta: {
        className: "hidden sm:table-cell text-xs",
      },
    },
    {
      accessorKey: "categoryName",
      header: "Catégorie",
      meta: {
        className: "hidden sm:table-cell text-xs",
      },
    },

    {
      accessorKey: "watched",
      header: "",
      cell: ({ row }) => (
        <ToggleWatchedButton
          mediaId={row.original.id}
          watched={row.original.watched}
          setError={setUpdateError}
        />
      ),
      meta: {
        className: "px-0 py-1 sm:p-4",
      },
    },

    {
      id: "delete",
      cell: ({ row }) => (
        <DeleteMediaButton
          mediaId={row.original.id}
          watched={row.original.watched}
          setError={setUpdateError}
        />
      ),
      meta: {
        className: "hidden sm:table-cell p-4",
      },
    },

    {
      id: "edit",
      cell: ({ row }) => <EditMediaDialog media={row.original} />,
      meta: {
        className: "hidden sm:table-cell p-4",
      },
    },

    {
      id: "suggest",
      cell: ({ row }) => <ShareMediaDialog media={row.original} />,
      meta: {
        className: "hidden sm:table-cell p-4",
      },
    },

    {
      id: "mobileOptions",
      cell: ({ row }) => (
        <MediaOptions media={row.original} onError={setUpdateError} />
      ),
      meta: {
        className: "sm:hidden p-0",
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex justify-center">
        {updateError && <p className="error-message">{updateError}</p>}
      </div>
      <div className="border border-r-radius border-accent-dark mt-4 sm:mt-8">
        <Table>
          <TableHeader className="hidden sm:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        (header.column.columnDef as MediaColumnDef<MediaItem>)
                          .meta?.className
                      }
                    >
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
                      ? "bg-accent-dark text-accent italic"
                      : "hover:bg-muted/50"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        (cell.column.columnDef as MediaColumnDef<MediaItem>)
                          .meta?.className
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
