import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/options";
import SuggestionsList from "@/components/SuggestionsList";
import ReceivedMessages from "@/components/ReceivedMessages";

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
    <section>
      <div className="flex flex-col items-center  h-full my-10">
        <h1 className="text-3xl">Hello {session?.user.name}</h1>
        <p>
          Ready to <span className="font-bold">watch</span>
        </p>
      </div>

      <div className="m-10">
        <ReceivedMessages />
      </div>

      <div className="m-10">
        <h2 className="font-bold text-xl">Suggestions reçues</h2>
        <SuggestionsList />
      </div>
    </section>
  );
}
