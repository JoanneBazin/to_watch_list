import FilmList from "@/components/FilmLists";
import { prisma } from "@/lib/script";
import { CategoryProps, Item } from "@/lib/types";

async function fetchFilms(): Promise<Item[]> {
  const films = await prisma.films.findMany();
  return films;
}

async function fetchCategories(): Promise<CategoryProps[]> {
  const response = await fetch("http://localhost:3000/api/category");

  if (!response.ok) {
    throw new Error(`HTTP error ! ${response.status}`);
  }
  return response.json();
}

const FilmsPage = async () => {
  const categories: CategoryProps[] = await fetchCategories();
  const films: Item[] = await fetchFilms();

  return (
    <section>
      <FilmList initialFilms={films} categories={categories} />
    </section>
  );
};

export default FilmsPage;
