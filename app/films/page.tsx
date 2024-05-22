import FilmList from "@/components/FilmLists";
import { CategoryProps, Item } from "@/lib/types";

async function fetchFilms(): Promise<Item[]> {
  const response = await fetch("http://localhost:3000/api/films");

  if (!response.ok) {
    throw new Error(`HTTP error ! ${response.status}`);
  }
  return response.json();
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
    <div>
      <section>
        <FilmList initialFilms={films} />
      </section>
    </div>
  );
};

export default FilmsPage;
