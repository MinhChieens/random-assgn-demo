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
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
    notifySuccess();
  };

  return (
    <div class="w-2/3 h-64 mx-auto flex flex-col justify-center items-center">
      <h2 class="font-bold font-[poppins] text-2xl">Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className={
              "w-4/5 rounded-[5px] border-4 pl-3 border-black py-2 font-bold"
            }
            type="email"
            value={email}
            name="email"
          />
        </div>
        <button
          type="submit"
          class="mt-3 h-10 w-32 bg-blue-400 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          Reset Password
        </button>
      </form>
      {error && <p class="text-red-500">{error}</p>}
      {successMessage && <p class="text-green-500">{successMessage}</p>}
    </div>
  );
};

export default ForgotPass;
