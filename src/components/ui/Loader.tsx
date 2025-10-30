import clsx from "clsx";

interface LoaderProps {
  size?: "small" | "medium" | "large";
}

export const Loader = ({ size = "medium" }: LoaderProps) => {
  let sizeLoader: string;
  switch (size) {
    case "small":
      sizeLoader = "h-5 w-5";
      break;
    case "medium":
      sizeLoader = "h-8 w-8";
      break;
    case "large":
      sizeLoader = "h-10 w-10";
      break;
  }
  return (
    <div className="flex justify-center items-center my-6">
      <div
        className={clsx(
          sizeLoader,
          "animate-spin rounded-full border-t-4 border-zinc-400"
        )}
      ></div>
    </div>
  );
};
