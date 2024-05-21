import CategorieList from "@/components/CategorieList";
import { prisma } from "@/lib/script";
import { CategoryProps } from "@/lib/types";

async function fetchCategories(): Promise<CategoryProps[]> {
  const categories = await prisma.category.findMany();
  return categories;
}

const Overview = async () => {
  const categories: CategoryProps[] = await fetchCategories();

  return (
    <section className="m-10">
      <div>
        <h1>Add new category</h1>
        <CategorieList initialCategories={categories} />
      </div>
    </section>
  );
};

export default Overview;
