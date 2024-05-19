import Categories from "@/components/Categories";
import AddCategory from "@/components/actions/AddCategory";

export default function Home() {
  return (
    <section className="m-10 columns-2">
      <div>
        <div>Add Film</div>
        <div>Add Serie</div>
      </div>
      <div>
        <h1>Add new category</h1>
        <AddCategory />
        <Categories />
      </div>
    </section>
  );
}
