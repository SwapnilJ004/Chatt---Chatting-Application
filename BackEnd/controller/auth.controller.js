import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js" 

export const signup = async(req,res,next) => {
    const {username, email, password, confirmPassword, gender} = req.body

    let validUser;
    
    validUser = await User.findOne({email})

    if(validUser){
        return next(errorHandler(400,"User already exists"))
    }

    if(password !== confirmPassword){
        return next(errorHandler(400,"Passwords didn't match"))
    }

    const hashedPassword = bcryptjs.hashSync(password,10)

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        profilePic: gender == "Male" ? maleProfilePic : femaleProfilePic
    })

    try{
        //Generate json web token for token based authentication
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET)

        await newUser.save()

        res.cookie("Access_token",token,{httpOnly: true}).status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        })
    }
    catch(error){
        next(error)
    }
}

export const login = async(req,res,next) => {
    try{
        const {email, password} = req.body;

        const validUser = await User.findOne({email})

        if(!validUser){
            return next(errorHandler(404, "User not found"))
        }

        const isValidPassword = bcryptjs.compareSync(password, validUser.password)

        if(!isValidPassword){
            return next(errorHandler(404, "Wrong credentials"))
        }

        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)

        res.cookie("Access_token",token,{httpOnly: true}).status(200).json({
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            profilePic: validUser.profilePic 
        })
    }
    catch(error){
        next(error)
    }
}

export const logout = (req,res,next) => {}