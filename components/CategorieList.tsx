"use client";
import AddCategory from "./actions/forms/AddCategory";
import { Card, CardTitle } from "./ui/card";
import { useFetchCategories } from "./hooks/useFetchCategories";
import { Loader } from "./layout/Loader";

export default function CategorieList() {
  const { categories, loading, error, refetch } = useFetchCategories();

  return (
    <div>
      <AddCategory onAdded={refetch} />
      <div className="flex">
        <div className="grid gap-3 m-4">
          {loading ? (
            <Loader />
          ) : (
            categories.map((category) => (
              <Card className="p-4" key={category.id}>
                <CardTitle>{category.name}</CardTitle>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
