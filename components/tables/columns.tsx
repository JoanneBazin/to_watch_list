"use client";
import { Item } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<Item>[] = [
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
];
