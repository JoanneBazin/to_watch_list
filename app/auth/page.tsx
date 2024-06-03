import SignIn from "@/components/actions/Auth/SignIn";
import SignUp from "@/components/actions/Auth/SignUp";
import React from "react";

const Authentification = () => {
  return (
    <div className="flex">
      <div>
        <p>Créer un compte</p>
        <SignUp />
      </div>

      <div>
        <p>Connexion</p>
        <SignIn />
      </div>
    </div>
  );
};

export default Authentification;
