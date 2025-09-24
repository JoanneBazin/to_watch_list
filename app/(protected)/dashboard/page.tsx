"use client";

import WatchList from "@/src/features/media/components/WatchList";
import { useState } from "react";

const DashboardPage = () => {
  const [categ, setCateg] = useState("");

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categ }),
      });
      if (!response.ok) {
        console.log("oups");
      }
      console.log("Categ crée");
      setCateg("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1 className="font-semibold text-center text-3xl m-8">Watch List</h1>
        <WatchList />
      </div>
      <div className="mx-12">
        <h2>Ajout catégorie</h2>
        <input
          type="text"
          value={categ}
          onChange={(e) => setCateg(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  );
};

export default DashboardPage;
