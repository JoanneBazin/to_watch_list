"use client";

import { SectionNavButton } from "@/src/components/layout";
import {
  DashboardProvider,
  useDashboard,
} from "@/src/features/media/DashboardContext";

const DashboardLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { section, setSection } = useDashboard();
  return (
    <div>
      <nav className="flex sm:gap-6 items-center justify-center p-6 sm:p-10">
        <SectionNavButton
          label="Films"
          value="films"
          section={section}
          setSection={setSection}
        />
        <SectionNavButton
          label="Séries"
          value="series"
          section={section}
          setSection={setSection}
        />
        <SectionNavButton
          label="Catégories"
          value="categories"
          section={section}
          setSection={setSection}
        />
      </nav>
      {children}
    </div>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider defaultSection="films">
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
