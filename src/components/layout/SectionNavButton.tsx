import { SectionNavButtonProps } from "@/src/types";
import clsx from "clsx";

export const SectionNavButton = <T extends string>({
  label,
  value,
  section,
  setSection,
}: SectionNavButtonProps<T>) => (
  <button
    onClick={() => setSection(value)}
    className={clsx(
      "px-4",
      section === value
        ? "text-accent-foreground font-semibold text-lg sm:text-2xl lg:text-4xl"
        : "text-base sm:text-xl lg:text-2xl hover:text-accent"
    )}
    data-testid={`${value}-nav`}
  >
    {label}
  </button>
);
