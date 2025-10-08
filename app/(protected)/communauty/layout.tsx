"use client";

import { SectionNavButton } from "@/src/components/ui";
import {
  CommunautyProvider,
  useCommunauty,
} from "@/src/features/social/CommunautyContext";

const CommunautyLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { section, setSection } = useCommunauty();

  return (
    <div>
      <nav className="flex gap-6 justify-center p-10">
        <SectionNavButton
          label="Contacts"
          value="contacts"
          section={section}
          setSection={setSection}
        />
        <SectionNavButton
          label="Demandes en attente"
          value="requests"
          section={section}
          setSection={setSection}
        />
        <SectionNavButton
          label="Parcourir"
          value="search"
          section={section}
          setSection={setSection}
        />
      </nav>
      {children}
    </div>
  );
};

export default function CommunautyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommunautyProvider defaultSection="contacts">
      <CommunautyLayoutContent>{children}</CommunautyLayoutContent>
    </CommunautyProvider>
  );
}
