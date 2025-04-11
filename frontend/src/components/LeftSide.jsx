import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const LeftSide = () => {
  const { logoutUser, getUsersList, user, users,setSelectedUser } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState([]);
 

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (users && user) {
      const filtered = users.filter((u) => u._id !== user._id); // or u._id !== user._id depending on your schema
      setFilteredUsers(filtered);
    }
  }, [users, user]);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-300 bg-white">
      {/* User List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold mb-3">Users</h3>
        <ul className="space-y-2">
          {filteredUsers?.map((u) => (
            <li
              key={u._id}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
              onClick={() => setSelectedUser(u)}
            >
              {u.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Current User Info & Logout */}
      <div className="p-4 border-t border-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={user?.profilePic || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">{user?.name || "Your Name"}</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
