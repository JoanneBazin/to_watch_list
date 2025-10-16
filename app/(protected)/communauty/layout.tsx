"use client";

import { SectionNavButton } from "@/src/components/layout";
import {
  CommunautyProvider,
  useCommunauty,
} from "@/src/features/social/CommunautyContext";
import { useUserStore } from "@/src/features/user/user.store";

const CommunautyLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { section, setSection } = useCommunauty();
  const { friendRequests } = useUserStore((s) => s.counts);

  return (
    <div>
      <nav className="flex sm:gap-6 items-center justify-center p-6 sm:p-10">
        <SectionNavButton
          label="Contacts"
          value="contacts"
          section={section}
          setSection={setSection}
        />
        <div className="relative">
          <SectionNavButton
            label="Demandes en attente"
            value="requests"
            section={section}
            setSection={setSection}
          />
          {friendRequests > 0 && (
            <span className="absolute right-1 -top-1 text-xs lg:text-sm text-accent-foreground">
              {friendRequests}
            </span>
          )}
        </div>
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
