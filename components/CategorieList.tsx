"use client";
import { CategoryProps } from "@/lib/types";
import { useEffect, useState } from "react";
import AddCategory from "./actions/forms/AddCategory";
import { Card, CardTitle } from "./ui/card";

export default function CategorieList({
  initialCategories,
}: {
  initialCategories: CategoryProps[];
}) {
  const [categories, setCategories] = useState(initialCategories);

  const fetchCategories = async () => {
    const response = await fetch("/api/category");
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <AddCategory onAdded={fetchCategories} />
      <div className="grid gap-3 m-4">
        {categories.map((category) => (
          <Card className="p-4 " key={category.id}>
            <CardTitle>{category.name}</CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
}
