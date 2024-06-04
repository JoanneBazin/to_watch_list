import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  // Return ==> Server Session
  const session = await getServerSession(AuthOptions);

  return <div>{session ? <div>{JSON.stringify(session)}</div> : null}</div>;
}
