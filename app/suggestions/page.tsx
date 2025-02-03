import ReceivedMessages from "@/app/components/ReceivedMessages";
import SuggestionsList from "@/app/components/SuggestionsList";

const SuggestionsPage = () => {
  return (
    <div>
      <h2 className="m-10 p-8 text-3xl border rounded-md">Suggestions</h2>
      <SuggestionsList />
      <h2 className="m-10 p-8 text-3xl border rounded-md">
        Retour de suggestions
      </h2>
      <ReceivedMessages />
    </div>
  );
};

export default SuggestionsPage;
