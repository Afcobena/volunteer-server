const router = require("express").Router();
const User = require("../models/User.model")
const Proposal = require("../models/Proposal.model")
const Collaborate = require("../models/Collaborate.model")

const isAuthenticated = require("../middlewares/isAuthenticated");
const isOwner = require("../middlewares/isOwner");

router.get("/", isAuthenticated ,async (req, res, next) => {

    const userId = req.payload._id
    
    console.log("ESTE ES EL ID", userId)

    try {
        const userProposals = await Proposal.find({owner: userId})
        console.log("ESTA COSA ES PROFILE", userProposals)
        res.json(userProposals)
        
    } catch (error) {
        next(error)
    }
})


/* router.get("/:id", async (req, res, next) => {

    const {id} = req.params
    
    console.log("ESTE ES EL ID", id)

    try {
        const userProposals = await Proposal.find({owner: id})
        console.log("ESTA COSA ES PROFILE", userProposals)
        res.json(userProposals)
        
    } catch (error) {
        next(error)
    }
}) */







module.exports = router;