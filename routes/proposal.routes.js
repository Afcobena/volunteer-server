const router = require("express").Router();
const Proposal = require("../models/Proposal.model")
const User = require("../models/User.model")
const Collaborate = require("../models/Collaborate.model")


const isAuthenticated = require("../middlewares/isAuthenticated")
const {isOwner} = require("../middlewares/isOwner");




// GET "/api/proposal" ruta para enviar todas las Proposals.
router.get("/", async (req, res, next) => {

    /* const {owner} = req.body */


    try {
        const allProposals = await Proposal.find().populate("owner")
        res.json(allProposals);

    } catch (error) {
        next(error)
    }

    try {
        
    } catch (error) {
        next(error)
    }

    
  
});


// POST "/api/proposal" ruta para recibir y crear una nueva Proposal.
router.post("/", isAuthenticated, async (req, res, next) => {

    /* console.log(req.body) */
    const userId = req.payload._id
    const {date, title, category, text} = req.body

    try {
        const newProposal = await Proposal.create({
            date,
            title,
            category,
            text,
            owner: userId
        })
        res.json(newProposal);
    } catch (error) {
        next(error)
    }
});


// GET "/api/proposal/:id" ruta para enviar todas los detalles de una Proposal en especifico.
router.get("/:id", isAuthenticated, async (req, res, next) => {

    /* console.log(req.params) */
    const {id} = req.params

    try {
        const detailsProposal = await Proposal.findById(id).populate("owner")

        console.log("DETAILS", detailsProposal)
        /* const proposalCollaborations = await Collaborate.find({proposal: id}).populate("owner") */


        /* res.json({detailsProposal, proposalCollaborations}) */
        res.json(detailsProposal)
        
    } catch (error) {
        next(error)
    }
})


//! PERFIL
// GET "/api/proposal/:id" ruta *POPULATE* para enviar los detalles de una Proposal al /PERFIL.
router.get("/:id", async (req, res, next) => {

    const {id} = req.params

    try {
        const detailsProposal = await Proposal.findById(id).populate("owner")

        const detailsOwner = await User.findById(id).populate("proposal")

        console.log("DETAILS", detailsProposal, detailsOwner)

        res.json({detailsProposal, detailsOwner})
        
    } catch (error) {
        next(error)
    }
})



// DELETE "/api/proposal/:id" ruta para borrar una Proposal por su id.
router.delete("/:id", isAuthenticated, isOwner, async (req, res, next) => {

    const {id} = req.params

    try {
        await Proposal.findByIdAndDelete(id)

        res.status(200).json("Elemento Borrado")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/proposal/:id" ruta para recibir cambios y editar una Proposal por su id.
router.patch("/:id", isAuthenticated, isOwner, async (req, res, next) => {
    
    const {id} = req.params
    const {date, title, category, text, owner} = req.body

    try {
        await Proposal.findByIdAndUpdate(id, {
            date,
            title,
            category,
            text,
            owner
        })

        res.json("Elemento editado")

    } catch (error) {
        next(error)
    }
})





module.exports = router;




