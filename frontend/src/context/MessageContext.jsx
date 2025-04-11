import { createContext } from "react";
import { axiosInstance } from "./../../lib/axios";
import  React from "react"
import { toast } from "react-toastify";

export const messageContext = createContext();

export const MessageProvider = ({ children }) => {
  const sendMessage = async ({ receiverId, text }) => {
    try {
      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        text,
      });
      toast.success("Message sent successfully");
      return res.data.messages;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getMessages = async (userToChatId) => {
    try {
      const res = await axiosInstance.get(`/messages/receive/${userToChatId}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <messageContext.Provider value={{ sendMessage,getMessages }}>
      {children}
    </messageContext.Provider>
  );
};
