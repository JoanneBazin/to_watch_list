import { SuggestionsProps } from "@/src/types";
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";
import SendResponseComment from "../../suggestions/components/SendResponseComment";

export const MediaCardSuggestions = ({
  suggestions,
}: {
  suggestions: SuggestionsProps[];
}) => {
  return (
    <div className="flex flex-col">
      Suggestion envoyée par{" "}
      {suggestions.map((suggest) => (
        <div key={suggest.id}>
          <span className="font-semibold">{suggest.sender.name}</span>
          <p className="flex my-2">
            <RiSingleQuotesL />
            {suggest.senderComment}
            <RiSingleQuotesR />
          </p>
          {!suggest.receiverComment && (
            <SendResponseComment suggestionId={suggest.id} />
          )}
        </div>
      ))}
    </div>
  );
};
