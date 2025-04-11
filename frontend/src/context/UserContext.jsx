import { createContext, useState } from "react";
import { axiosInstance } from "./../../lib/axios";
import { toast } from "react-toastify";
import React from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users,setUsers]=useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const registerUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/register", userData);
      setUser(res.data);
      toast.success("User registered successfully");
    } catch (error) {
      console.error(error);
      toast.error("User registration failed");
    }
  };

  const loginUser = async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      setUser(res.data);
      toast.success("User logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error("User login failed");
    }
  };

  const checkAuth=async()=>{
    try{
      const res=await axiosInstance.get("/auth/checkAuth");
      setUser(res.data);
    }catch(error){
      setUser(null);
      console.error(error);
    }finally{
      setIsChecking(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      toast.success("User logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error("User logout failed");
    }
  };

  const getUsersList = async () => {
    try {
      const res = await axiosInstance.get("/auth/getuserslist");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users list");
    }
  }

  return (
    <UserContext.Provider value={{ user, registerUser,loginUser,checkAuth,isChecking,logoutUser,getUsersList,users,selectedUser,setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};
