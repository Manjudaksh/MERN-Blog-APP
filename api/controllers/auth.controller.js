import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHeader } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
    const { username, email, password } = req.body;

    if(!username ||
        !email ||
        !password ||
        username === '' ||
        password === '' ||
        email === '')
        {
        next(errorHeader(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10); 
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        res.json('signup successfuly');
    } catch(error){
        next(error);
    }   
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    
    if(!email || !password || email === '' || password === '') {
        next(errorHeader (400, 'All fields are required'));
    }

    try{
        const validUser = await User.findOne({email});
        if( !validUser){
            next(errorHeader (400, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHeader(400, 'Invalid password'))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token,{
            httpOnly: true
        })
        .json(rest);
    } catch(error){
        next(error);
    }
}