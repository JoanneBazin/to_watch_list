import SignIn from "@/components/actions/auth/SignIn";
import SignUp from "@/components/actions/auth/SignUp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const Authentification = () => {
  return (
    <div className="flex flex-col gap-10 mx-auto my-8 w-1/2 ">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="bg-zinc-700 border rounded-md p-4 flex flex-col items-center justify-center">
              <p>Créer un compte</p>
              <SignUp />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="bg-zinc-700 border rounded-md p-4 flex flex-col items-center justify-center">
              <p>Connexion</p>
              <SignIn />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Authentification;
