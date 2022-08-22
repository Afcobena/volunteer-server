const router = require("express").Router();
const User = require("../models/User.model")
const Proposal = require("../models/Proposal.model")
const Collaborate = require("../models/Collaborate.model")
/* const isOwner = require("../middlewares/isOwner") */

router.get("/:id", async (req, res, next) => {

    const {id} = req.params

    try {
        const userProposals = await User.findById(id).populate("proposal")

        const userCollaborations = await User.findById(id).populate("collaborate")

        res.json({userProposals, userCollaborations})
        
    } catch (error) {
        next(error)
    }
})







module.exports = router;