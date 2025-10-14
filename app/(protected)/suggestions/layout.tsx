"use client";

import { SectionNavButton } from "@/src/components/layout/SectionNavButton";
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
      <nav className="flex gap-6 justify-center p-10">
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
