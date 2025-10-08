export interface SectionContextType<T extends string> {
  section: T;
  setSection: (section: T) => void;
}

export interface ProviderType<T extends string> {
  children: React.ReactNode;
  defaultSection: T;
}

export interface SectionNavButtonProps<T extends string> {
  label: string;
  value: T;
  section: T;
  setSection: (section: T) => void;
}
