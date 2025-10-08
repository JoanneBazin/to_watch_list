import { createContext, useContext, useState } from "react";
import { ProviderType, SectionContextType } from "../types";

export const createSectionContext = <T extends string>() => {
  const Context = createContext<SectionContextType<T> | null>(null);

  const Provider = ({ children, defaultSection }: ProviderType<T>) => {
    const [section, setSection] = useState<T>(defaultSection);
    return (
      <Context.Provider value={{ section, setSection }}>
        {children}
      </Context.Provider>
    );
  };

  const useSection = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useSection must be used within its Provider");
    return ctx;
  };

  return [Provider, useSection] as const;
};
