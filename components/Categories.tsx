import { prisma } from "@/script";
import React from "react";

const Categories = async () => {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  });

  const response = JSON.stringify(categories);

  console.log(categories[0].name);

  return (
    <div>
      <ul></ul>
    </div>
  );
};

export default Categories;
