import CategorieList from "@/components/CategorieList";
import { prisma } from "@/lib/script";
import { CategoryProps } from "@/lib/types";

async function fetchCategories(): Promise<CategoryProps[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

export default async function Home() {
  const categories: CategoryProps[] = await fetchCategories();
  return (
    <section className="m-10">
      <div>
        <div>Add Film</div>
        <div>Add Serie</div>
      </div>
      <div>
        <h1>Add new category</h1>
        <CategorieList initialCategories={categories} />
      </div>
    </section>
  );
}
