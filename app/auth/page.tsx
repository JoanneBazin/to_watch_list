import SignIn from "@/components/actions/auth/SignIn";
import SignUp from "@/components/actions/auth/SignUp";
import SignInBtn from "@/components/actions/auth/SignUpBtn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Authentification = () => {
  return (
    <div className="rounded-md p-4 flex flex-col items-center justify-center">
      <h2>Créer un compte</h2>

      <SignUp />
    </div>
  );
};

export default Authentification;
