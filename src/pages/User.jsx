import React from "react";
import { getAuth, signOut } from "firebase/auth";

const User = () => {
   const signOut1 = () => {
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
         })
         .catch((error) => {
            // An error happened.
            console.log("Error: " + error);
         });
   };
   return (
      <div>
         <button onClick={signOut1}>SIGN OUT</button>
      </div>
   );
};

export default User;
