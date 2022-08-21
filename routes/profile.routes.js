const router = require("express").Router();
const User = require("../models/User.model")
const Proposal = require("../models/Proposal.model")
const Collaborate = require("../models/Collaborate.model")
/* const isOwner = require("../middlewares/isOwner") */

router.get("/:id", async (req, res, next) => {

    const {id} = req.params
/*     const {proposal, collaborate} = req.body
 */
    try {
        const theProfile = await User.findById(id).populate("collaborate")

        /* const theProfile = await User.findById(id).populate("proposal").populate("collaborate") */
        /* await Proposal.findById(id).populate("owner")
        await Collaborate.findById(id).populate("owner") */
        /* await User.findById(id).populate("proposal")
        await User.findById(id).populate("collaborate") */
        res.json(theProfile)
        
    } catch (error) {
        next(error)
    }
})







module.exports = router;