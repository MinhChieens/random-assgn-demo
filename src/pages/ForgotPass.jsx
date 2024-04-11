import React from "react";
import { useState } from "react";
import { auth } from "../constants/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const ForgotPass = () => {
   const [email, setEmail] = useState("");
   const [error, setError] = useState(null);
   const [successMessage, setSuccessMessage] = useState("");

   const handleResetPassword = async (event) => {
      event.preventDefault();

      try {
         await sendPasswordResetEmail(auth, email);
         setSuccessMessage("Password reset email sent. Check your inbox.");
         setError(null);
      } catch (error) {
         setError(error.message);
         setSuccessMessage("");
      }
   };

   return (
      <div>
         <h2>Forgot Password</h2>
         <form onSubmit={handleResetPassword}>
            <div>
               <label>Email:</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Reset Password</button>
         </form>
         {error && <p>{error}</p>}
         {successMessage && <p>{successMessage}</p>}
      </div>
   );
};

export default ForgotPass;
