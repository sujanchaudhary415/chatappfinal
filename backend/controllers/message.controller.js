import messageModel from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user._id;
    const message = await messageModel.create({ senderId, receiverId, text });
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const myId = req.user._id;
    const messages = await messageModel
      .find({
        $or: [
          { senderId:myId, receiverId:userToChatId },
          { senderId: userToChatId, receiverId:myId },
        ],
      })
      .sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {}
};
