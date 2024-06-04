import CategorieList from "@/components/CategorieList";
import { User } from "@/components/actions/Auth/User";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/options";

const Overview = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <section className="m-10">
      {session ? (
        <div className="m-10">
          <User />
        </div>
      ) : null}
      <div>
        <CategorieList />
      </div>
    </section>
  );
};

export default Overview;
