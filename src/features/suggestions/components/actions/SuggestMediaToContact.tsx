import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
} from "@/src/components/ui";
import { SuggestMediaToContactProps } from "@/src/types";
import { useAddExistantMedia } from "../../../media/hooks";
import { useState } from "react";
import { SendSuggestion } from "../ui";

export const SuggestMediaToContact = ({
  contact,
  mediaId,
}: SuggestMediaToContactProps) => {
  const { addExistantMedia, isAddingMedia, addError } = useAddExistantMedia(
    true,
    contact.id
  );
  const isAlreadySuggested = contact.suggestionsFromUser.dbId.some(
    (id) => id === mediaId
  );
  const [sentSuggestion, setSentSuggestion] = useState(isAlreadySuggested);

  const handleSuggest = async (comment?: string) => {
    const result = await addExistantMedia(mediaId, comment);
    if (result.success) {
      setSentSuggestion(true);
    }
  };

  return (
    <Accordion type="single" collapsible className="px-4 w-full">
      <AccordionItem value={contact.id}>
        <AccordionTrigger>
          <div className="flex gap-4">
            <Avatar
              img={contact.image}
              size="small"
              alt={`Avatar de ${contact.name}`}
            />
            <span className="mr-6">{contact.name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          {sentSuggestion ? (
            <p>Suggestion envoyée !</p>
          ) : (
            <SendSuggestion
              onSubmit={handleSuggest}
              isLoading={isAddingMedia}
              error={addError}
            />
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
