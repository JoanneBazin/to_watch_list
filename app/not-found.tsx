import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center bg-black overflow-hidden text-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[120vw] h-[120vh] blur-3xl animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 50%, rgba(255,215,128,0.15), transparent 70%)",
          }}
        ></div>
      </div>

      <h1 className="text-[7rem] sm:text-[10rem] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#310704] to-[#ca251c]">
        404
      </h1>
      <p className=" text-accent-foreground text-lg mb-8">
        Cette page n&apos;existe pas
      </p>
      <Link
        href="/"
        className="z-50 border border-[#7c0902] text-[#7c0902] hover:text-accent hover:border-accent rounded-sm py-2 px-3"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
};

export default NotFound;
