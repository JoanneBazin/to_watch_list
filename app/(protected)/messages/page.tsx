import SuggestionsList from "@/src/features/suggestions/components/SuggestionsList";
import ReceivedMessages from "../../components/features/social/ReceivedMessages";

export default function MessagesPage() {
  return (
    <div>
      <h2 className="m-10 p-8 text-3xl border rounded-md">
        Retour de suggestions
      </h2>
      <ReceivedMessages />
      <SuggestionsList />
    </div>
  );
}
