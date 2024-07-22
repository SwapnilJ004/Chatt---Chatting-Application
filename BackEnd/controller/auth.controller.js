import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.js" 

export const signup = async(req,res,next) => {
    const {username, email, password, confirmPassword, gender} = req.body

    let doesUserAlreadyExists;
    
    doesUserAlreadyExists = await User.findOne({email})

    if(doesUserAlreadyExists){
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

export const login = (req,res) => {}

export const logout = (req,res) => {}