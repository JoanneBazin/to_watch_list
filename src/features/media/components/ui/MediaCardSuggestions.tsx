import { SendResponseComment } from "@/src/features/suggestions/components";
import { SuggestionsProps } from "@/src/types";

export const MediaCardSuggestions = ({
  suggestions,
}: {
  suggestions: SuggestionsProps[];
}) => {
  return (
    <div className="sm:mx-6 min-w-[40%]">
      <div className="sm:hidden w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent my-4"></div>
      <p className="text-sm mb-2">Suggestion envoyée par</p>
      <div className="flex flex-col gap-4 justify-start">
        {suggestions.map((suggest) => (
          <div key={suggest.id}>
            <span className="font-semibold">{suggest.sender.name}</span>
            {suggest.senderComment && (
              <p className="flex my-2">{suggest.senderComment}</p>
            )}
            {!suggest.receiverComment && (
              <SendResponseComment suggestionId={suggest.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
