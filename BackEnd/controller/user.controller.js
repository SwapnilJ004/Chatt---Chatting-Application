import User from "../models/user.models.js"

export const getUserForSidebar = async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id

        const allUserExceptLoggedIn = await User.find({
            _id: {$ne: loggedInUserId}
        }).select("-password")

        res.status(200).json(allUserExceptLoggedIn)
    } catch (error) {
        next(error)
    }
}

export default getUserForSidebar