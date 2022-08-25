const Proposal = require("../models/Proposal.model")
const Collaborate = require("../models/Collaborate.model")

const isOwner = async (req,res,next) => {

    const userId = req.payload._id
    const {id} = req.params
    const myProposal = await Proposal.findById(id)

    try {
        if (myProposal.owner == userId) {
            next()
        } else {
            res.status(401).json({errorMessage: "No tienes permiso para editar esto"})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    isOwner,
}