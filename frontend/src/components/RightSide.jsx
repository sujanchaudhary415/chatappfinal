import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./../context/UserContext";
import { messageContext } from "./../context/MessageContext";

const RightSide = () => {
  const { selectedUser, user } = useContext(UserContext);
  const { sendMessage, getMessages } = useContext(messageContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages when a new user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser) {
        const msgs = await getMessages(selectedUser._id);
        if (msgs) setMessages(msgs);
      }
    };

    fetchMessages();
  }, [selectedUser, getMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      receiverId: selectedUser._id,
      text: newMessage,
    };

    const sentMessage = await sendMessage(newMsg);
    if (sentMessage) {
      setMessages((prev) => [
        ...prev,
        { senderId: user?._id, text: newMessage },
      ]);
    }
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      {!selectedUser ? (
        <div className="flex items-center justify-center flex-1">
          <img
            src="https://imgs.search.brave.com/WL4HRUAFQRNP_U_MZ0UEC3mXjas0H8L4c1I7UDdSXG8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGVub3JzaGFy/ZS5mci9pcGhvbmUt/ZGF0YS93aGF0c2Fw/cC5qcGc_dz0zNjUm/aD0zMzQ"
            alt="No user selected"
            className="max-w-xs"
          />
        </div>
      ) : (
        <>
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-gray-300 shadow-sm">
            <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs p-2 rounded-md ${
                  msg.senderId === user?._id
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-300 flex items-center"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RightSide;
