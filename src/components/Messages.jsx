import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../constants/firebase";
import { getAuth } from "firebase/auth";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faX } from "@fortawesome/free-solid-svg-icons";
const notifySuccess = () =>
  toast.success("Updated Successfully!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
const MessageAdmin = ({ uid }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle message send logic here
    console.log("Message sent:", message);
    const dataAdmin = await getDoc(doc(db, "admin", uid));
    const listDoctors = dataAdmin.data().listOfDoctors;
    listDoctors.map(async (item) => {
      await updateDoc(doc(db, "doctors", item), {
        messages: arrayUnion(message),
      });
    });
    notifySuccess();
  };

  return (
    <div className="w-2/3 mx-auto mt-10 p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          htmlFor="message"
          className="mb-2 text-lg font-medium text-gray-900"
        >
          Send a Message to all Staff
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message here..."
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const Messages = ({ uid }) => {
  const crtUser = getAuth().currentUser;
  if (!uid) uid = crtUser.uid;
  const [messages, setMessages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const getMessage = async () => {
    let data;
    const dataUsers = await getDoc(doc(db, "users", uid));
    if (dataUsers.exists()) {
      data = dataUsers;
    }
    const dataDoctor = await getDoc(doc(db, "doctors", uid));
    if (dataDoctor.exists()) {
      data = dataDoctor;
    }

    const dataAdmin = await getDoc(doc(db, "admin", uid));
    if (dataAdmin.exists()) {
      data = dataAdmin;
      setIsAdmin(true);
    }

    console.log(data.data());
    setMessages(data.data().messages);
  };
  useEffect(() => {
    getMessage();
  }, []);

  const handleDelete = async (message) => {
    let docRef;
    const dataUsers = await getDoc(doc(db, "users", uid));
    if (dataUsers.exists()) {
      docRef = doc(db, "users", uid);
    }
    const dataDoctor = await getDoc(doc(db, "doctors", uid));
    if (dataDoctor.exists()) {
      docRef = doc(db, "doctors", uid);
    }
    await updateDoc(docRef, {
      messages: arrayRemove(message),
    });
    console.log("Delete message: " + message);
    getMessage();
  };
  return (
    <>
      {!isAdmin ? (
        <div>
          {messages &&
            messages.map((message, idx) => {
              return (
                <div
                  key={idx}
                  className="h-10 w-[95%] flex items-center justify-between mx-auto mt-2 border-spacing-2 border-2 border-black bg-sky-200 font-[poppins]"
                >
                  <p className=" pl-3">{message}</p>
                  <button
                    className="mr-4 h-8 w-8 cursor-pointer hover:bg-red-400"
                    onClick={() => handleDelete(message)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faX} />
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        <MessageAdmin uid={uid} />
      )}
    </>
  );
};

export default Messages;
