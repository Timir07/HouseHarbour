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

  export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(user){//user exists
        const token = jwt.sign({id: user._id}, process.env.JWT_SCERET);//id->payload
        const { password: pass, ...rest} = user._doc;//in this password key is changed to pass and rest remains same 

        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
      }
      
      else{//creating user in mongodb so we generatePass as googleAuth doesn't use pass and aur field is true so we generare our own pass
        const generatedPassword =  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);//give decimal string of 36 char - 26,0-9; two times; sliced from end
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User( {username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo} );
        
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SCERET);
        const { password: pass, ...rest} = newUser._doc;//in this password key is changed to pass and rest remains same 

        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);//sending info from database
      }

    } catch (error) {
      next(error);
    }
  }

  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!')
    } catch (error) {
      next(error)
    }
  }