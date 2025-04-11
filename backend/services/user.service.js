import userModel from "./../models/user.model.js";

const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Please provide all fields");
  }
  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  return user;
};

export default createUser;
