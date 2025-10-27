import { MediaModalNavProps } from "@/src/types";
import clsx from "clsx";

export const MediaModalNav = ({
  views,
  activeView,
  setView,
}: MediaModalNavProps) => {
  return (
    <>
      <nav className="flex justify-around mt-4">
        {views.map((v) => (
          <button
            key={v.id}
            className={clsx(
              "text-sm sm:text-base",
              activeView === v.id
                ? "text-accent-foreground font-semibold"
                : "hover:text-accent"
            )}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </>
  );
};
