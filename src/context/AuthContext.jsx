import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../constants/firebase";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();
export const useAuth = () => {
   return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const [userLoggedIn, setUserLoggedIn] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const followChange = onAuthStateChanged(auth, initializeUser);
      return followChange;
   }, []);

   useEffect(() => {
      const unsubscribe = () => {
         if (currentUser) {
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
         }
      };
      return unsubscribe();
   }, []);

   const initializeUser = async (user) => {
      if (user) {
         setCurrentUser({ ...user });
         setUserLoggedIn(true);
      } else {
         setCurrentUser(null);
         setUserLoggedIn(false);
      }
      setLoading(false);
   };
   const value = {
      currentUser,
      userLoggedIn,
      loading,
   };
   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
