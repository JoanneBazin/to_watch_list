import SuggestionsList from "../components/SuggestionsList";
import WatchList from "../components/WatchList";

const DashboardPage = () => {
  return (
    <>
      <div>
        <h1 className="font-semibold text-center text-3xl m-8">Watch List</h1>
        <WatchList />
      </div>

      <div>
        <h2 className="m-10 p-8 text-3xl border rounded-md">Suggestions</h2>
        <SuggestionsList />
      </div>
    </>
  );
};

export default DashboardPage;
