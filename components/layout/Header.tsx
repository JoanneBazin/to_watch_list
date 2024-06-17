import Link from "next/link";
import { GiFilmStrip } from "react-icons/gi";
import SignOutBtn from "../actions/auth/SignOutBtn";
import SignUpBtn from "../actions/auth/SignUpBtn";
import SignInBtn from "../actions/auth/SignInBtn";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession();

  return (
    <nav className="flex my-4 items-center">
      <div className="flex mx-2">
        <Link href="/" className="text-3xl font-bold m-4">
          Watchers
        </Link>
        <GiFilmStrip className="size-10 mt-3" />
      </div>

      {session ? (
        <div className="flex gap-4 ml-8">
          <Link href="/watchlist">Watch List</Link>

          <Link href="/communauty">Communauté</Link>
        </div>
      ) : null}

      {session ? (
        <div className="flex px-12 items-center">
          <p>
            Hello
            <Link
              className="font-bold"
              href="/account"
            >{` ${session.user.name}`}</Link>
          </p>
          <SignOutBtn />
        </div>
      ) : (
        <div>
          <SignUpBtn />

          <SignInBtn />
        </div>
      )}
    </nav>
  );
};

export default Header;
