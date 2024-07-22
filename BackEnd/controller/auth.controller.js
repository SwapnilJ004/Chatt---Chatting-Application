import User from "../models/user.models.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async(req,res) => {
    const {username, email, password, confirmPassword, gender} = req.body

    let validUser;
    
    validUser = await User.findOne({email})

    if(validUser){
        return res.status(400).json({
            success: false,
            message: "Provided email already exists"
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            error: "Passwords didn't match"
        })
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
        console.log("Error",error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const login = (req,res) => {}

export const logout = (req,res) => {}