import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const RegisterUser = async (req, res) => {
  console.log(req.body);
  try {
    const pre_user = await User.find({ email: req.body.email });
    if (pre_user.length !== 0) {
      console.log(pre_user);
      res.status(500).json({ message: "User already exist" });
      return;
    }

    let { password, ...rest } = req.body;
    password = bcrypt.hashSync(password, 10);
    let user = await User.create({
      password,
      ...rest,
    });

    const token = generateToken(user._id);
    const { password: pass, ...data } = user;

    res.status(200).json({
      ...data._doc,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    res.status(400).json({ message: "no password provided" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Wrong Credentials" });
  }
  const passCompare = bcrypt.compare(password, user.password);
  if (!passCompare) {
    return res.status(400).json({ error: "Wrong Credentials" });
  }

  const { _doc } = user;
  const { password: pass, ...rest } = _doc;
  if (user) {
    res.json({
      ...rest,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

export const UserDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.find({ _id: id });
    console.log(user);
    if (!user) res.status(400).json({ message: "User doesn't exist" });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

export const UpdateUser = async (req, res) => {
  console.log(req.method);
  try {
    const user = await User.find({ _id: req.user._id });
    if (!user)
      res.status(400).json({ message: "No such User exist, can't update" });
    const details = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.status(200).json(details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({
      $and: [{ class: parseInt(req.params.class) }, { person: "student" }],
    }).select("-password");

    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
