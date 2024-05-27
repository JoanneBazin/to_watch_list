"use client";
import { CategoryProps } from "@/lib/types";
import { useEffect, useState } from "react";
import AddCategory from "./actions/forms/AddCategory";
import { Card, CardTitle } from "./ui/card";
import { DataTable } from "./tables/DataTable";
import { columns } from "./tables/columns";

export default function CategorieList({
  initialCategories,
}: {
  initialCategories: CategoryProps[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [selection, setSelection] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    const response = await fetch("/api/category");
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <AddCategory onAdded={fetchCategories} />
      <div className="flex">
        <div className="grid gap-3 m-4">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            categories.map((category) => (
              <Card className="p-4" key={category.id}>
                <CardTitle>{category.name}</CardTitle>
              </Card>
            ))
          )}
        </div>
        <div>
          <DataTable columns={columns} data={selection} />
        </div>
      </div>
    </div>
  );
}
