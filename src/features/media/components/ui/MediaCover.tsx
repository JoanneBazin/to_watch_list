import Image from "next/image";

export const MediaCover = ({
  cover,
  title,
}: {
  cover: string | null;
  title: string;
}) => {
  if (!cover) {
    return (
      <div className="card-cover bg-gray-800 flex flex-col items-center justify-center rounded-lg w-[70px] sm:w-[150px] lg:w-[200px] h-[150px] sm:h-[200px] lg:h-[300px]">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-600"
        >
          <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
          <path
            d="M8 2v4M16 2v4M4 10h16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-[70px] sm:w-[150px] lg:w-[200px] h-auto">
      <Image
        src={`https://image.tmdb.org/t/p/w500${cover}`}
        alt={`Affiche de ${title}`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority
      />
    </div>
  );
};
