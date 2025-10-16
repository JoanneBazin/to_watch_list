"use client";

import { SectionNavButton } from "@/src/components/layout";
import {
  SuggestionsProvider,
  useSuggestions,
} from "@/src/features/suggestions/SuggestionsContext";

const SuggestionsLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { section, setSection } = useSuggestions();

  return (
    <div>
      <nav className="flex sm:gap-6 items-center justify-center p-6 sm:p-10">
        <SectionNavButton
          label="Suggestions"
          value="suggestions"
          section={section}
          setSection={setSection}
        />
        <SectionNavButton
          label="Messages"
          value="messages"
          section={section}
          setSection={setSection}
        />
      </nav>
      {children}
    </div>
  );
};

export default function SuggestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuggestionsProvider defaultSection="suggestions">
      <SuggestionsLayoutContent>{children}</SuggestionsLayoutContent>
    </SuggestionsProvider>
  );
}
