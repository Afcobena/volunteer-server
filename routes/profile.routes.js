const router = require("express").Router();
const User = require("../models/User.model")
const Proposal = require("../models/Proposal.model")
const Collaborate = require("../models/Collaborate.model")

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated ,async (req, res, next) => {

    const userId = req.payload._id

    try {
        const userProposals = await Proposal.find({owner: userId})
        /* const userCollabs = await Collaborate.find({owner: userId}) */
        console.log("ESTA COSA ES PROFILE", userProposals)
        res.json(userProposals)
        /* res.json({userProposals, userCollabs}) */

        
    } catch (error) {
        next(error)
    }
})


/* router.get("/", isAuthenticated ,async (req, res, next) => {

    const userId = req.payload._id
    console.log("QUE ES", userID)
    
    try {
        const userCollabs = await Collaborate.find({owner: userId})
        console.log("ESTA COSA ES PROFILE", userCollabs)
        res.json(userCollabs)
        
    } catch (error) {
        next(error)
    }
}) */


/* router.get("/", isAuthenticated ,async (req, res, next) => {

    const userId = req.payload._id
    
    console.log("ESTE ES EL ID", userId)

    try {
        const userProposals = await Proposal.find({owner: userId})
        console.log("ESTA COSA ES PROFILE", userProposals)
        res.json(userProposals)
        
    } catch (error) {
        next(error)
    }
}) */







module.exports = router;