import { SectionNavButtonProps } from "@/src/types";
import clsx from "clsx";

export const SectionNavButton = <T extends string>({
  label,
  value,
  section,
  setSection,
}: SectionNavButtonProps<T>) => {
  return (
    <button
      onClick={() => setSection(value)}
      className={clsx(
        "px-4",
        section === value
          ? "text-white font-semibold text-4xl"
          : "text-2xl hover:text-white"
      )}
    >
      {label}
    </button>
  );
};
