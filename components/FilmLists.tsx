"use client";
import { CategoryProps, Item } from "@/lib/types";
import React, { useEffect, useState } from "react";
import AddEntryForm from "./actions/forms/AddEntryForm";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function FilmList({
  initialFilms,
  categories,
}: {
  initialFilms: Item[];
  categories: CategoryProps[];
}) {
  const [films, setFilms] = useState(initialFilms);
  const typeEntry = "film";

  const fetchFilms = async () => {
    const response = await fetch("/api/films");
    const data = await response.json();
    setFilms(data);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <div className="flex">
        <AddEntryForm
          entry={typeEntry}
          categories={categories}
          onAdded={fetchFilms}
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Films</h1>
        <ul className="grid grid-cols-3 gap-2">
          {films.map((item, index) => (
            <Card
              key={index}
              className="bg-gray-700 p-4 shadow rounded hover:bg-gray-600"
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{item.real}</CardContent>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
