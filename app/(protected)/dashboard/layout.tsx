"use client";

import { SectionNavButton } from "@/src/components/ui";
import { DashboardContextType, DashboardSection } from "@/src/types";
import { createContext, ReactNode, useContext, useState } from "react";

const DashboardContext = createContext<DashboardContextType | null>(null);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [section, setSection] = useState<DashboardSection>("films");

  return (
    <DashboardContext.Provider value={{ section, setSection }}>
      <div>
        <nav className="flex gap-6 justify-center p-10">
          <SectionNavButton label="Films" value="films" />
          <SectionNavButton label="Séries" value="series" />
          <SectionNavButton label="Catégories" value="categories" />
        </nav>
        {children}
      </div>
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx)
    throw new Error("useDasboard must be used within DashboardProvider");
  return ctx;
};
