import User from "../models/User.js";
import bcrypt from "bcryptjs";
// it is a library that stores our password in an encrypted form so that it is hidden from other users 

import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    // CREATE NEW USER
    const newUser = new User({
      ...req.body,
      password: hash,
      // username:req.body.username,
      // email:req.body.email,
      // password:req.body.password,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {

    // find that one user in the DB with that same username
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(    // compare the password with the hashed password by using
      req.body.password,                               // bcrypt.compare() function
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    // create a json web token to check if it is an admin
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin },process.env.JWT);

    const { password, isAdmin, ...otherDetails } = user._doc;  // as user is under user._doc
    
    res
    .cookie("access_token", token, {httpOnly: true,})
    .status(200).json({ details: { ...otherDetails }, isAdmin });

  } catch (err) {
    next(err);
  }
};