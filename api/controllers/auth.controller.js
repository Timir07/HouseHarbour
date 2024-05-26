import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({email});
    if(!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401, 'wrong credentials'))

    const token = jwt.sign({id: validUser._id}, process.env.JWT_SCERET);
    const { password: pass, ...rest} = validUser._doc;//in this password key is changed to pass and rest remains same 

    res
    .cookie('access_token', token, {httpOnly: true})
    .status(200)
    .json(rest);
  } catch (error) {
    next(error);
  }

}
  //in this if not unique and required not filled then error occurs.
  //application doesn't crash so error handling is done.