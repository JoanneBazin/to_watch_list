import CategorieList from "@/components/CategorieList";
import { CategoryProps } from "@/lib/types";

async function fetchCategories(): Promise<CategoryProps[]> {
  const response = await fetch("http://localhost:3000/api/category");

  if (!response.ok) {
    throw new Error(`HTTP error ! ${response.status}`);
  }
  return response.json();
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
