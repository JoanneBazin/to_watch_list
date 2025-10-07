import { useDashboard } from "@/app/(protected)/dashboard/layout";
import { SectionNavButtonProps } from "@/src/types";
import clsx from "clsx";

export const SectionNavButton = ({ label, value }: SectionNavButtonProps) => {
  const { section, setSection } = useDashboard();
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
