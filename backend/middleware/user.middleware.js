import userModel from "./../models/user.model.js";
import  jwt  from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
