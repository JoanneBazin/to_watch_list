import { prisma } from "@/lib/script";
import React from "react";

const Overview = async () => {
  const displayCategories = await prisma.category.findMany();

  return (
    <div>
      <h1>Overview</h1>
      <p>
        {displayCategories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </p>
    </div>
  );
};

export default Overview;
