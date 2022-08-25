/* const User = require("../models/User.model")

const isAdmin = async (req,res,next) => {

    const userRole = req.payload._id
    const myRole = await User.findById(userRole)

    try {
        if (myRole.role == "admin") {
            next()
        } else {
            res.status(401).json({errorMessage: "No me toques los ****"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    isAdmin,
} */