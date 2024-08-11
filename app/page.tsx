import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/options";
import WatchList from "@/components/WatchList";

export default async function Home() {
  // Return ==> Server Session
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center  h-full my-10">
        <h2 className="text-2xl">No session</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-center text-2xl">Watch List</h2>

      <WatchList />
    </div>
  );
}
