import React from "react";
import { useState } from "react";
import { auth } from "../constants/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const notifySuccess = () =>
    toast.success("Check your gmail box!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      notifySuccess();
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-2/3 h-64 mx-auto flex flex-col justify-center items-center">
      <h2 className="font-bold">Forgot Password</h2>
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
        <button type="submit" className=" mt-3 h-10 w-32 bg-sky-400">
          Reset Password
        </button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default ForgotPass;
