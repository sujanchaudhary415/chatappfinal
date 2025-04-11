import express from 'express';
import { protectRoute } from './../middleware/user.middleware.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const messageRouter= express.Router();

messageRouter.post("/send",protectRoute,sendMessage);

messageRouter.get("/receive/:id",protectRoute,getMessages);

export default messageRouter;