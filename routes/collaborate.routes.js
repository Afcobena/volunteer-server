const router = require("express").Router();
const Collaborate = require("../models/Collaborate.model")
const Proposal = require("../models/Proposal.model")
const User = require("../models/User.model")

const isAuthenticated = require("../middlewares/isAuthenticated")




// GET "/api/collaborate" ruta para enviar todas las Collaborate.
router.get("/", async (req, res, next) => {

    const {owner, proposal} = req.body

    try {
        const allCollaborate = await Proposal.find().populate(owner).populate(proposal)
        res.json(allCollaborate);

    } catch (error) {
        next(error)
    }

    
  
});


// POST "/api/collaborate" ruta para recibir y crear una nueva Collaborate.
router.post("/", isAuthenticated, async (req, res, next) => {

    console.log(req.body)

    const {category, proposal, text} = req.body

    const userId = req.payload._id


    try {
        const newCollaborate = await Collaborate.create({
            category,
            owner: userId,
            proposal,
            text,
        })
        res.json("creado");

    } catch (error) {
        next(error)
    }
  
});


// GET "/api/collaborate/:id" ruta para enviar todas los detalles de una Collaborate.
router.get("/:id",/*  isAuthenticated, */ async (req, res, next) => {

    const {id} = req.params

    try {
        const detailsCollaborate = await Collaborate.findById(id)


        res.json(detailsCollaborate)
        
    } catch (error) {
        next(error)
    }
})


//! POPULATE
// GET "/api/collaborate/:id" ruta *Collaborate* para enviar los detalles de una Collaborate al /PERFIL.
router.get("/:id/details", isAuthenticated, async (req, res, next) => {

    /* console.log(req.params) */
    const {id} = req.params

    const detailsCollaborate = await Collaborate.findById(id).populate("owner")


    router.get("/:id", isAuthenticated, async (req, res, next) => {

    /* console.log(req.params) */
    const {id} = req.params

    try {
        const detailsCollaborate = await Collaborate.findById(id)


        res.json(detailsCollaborate)
        
    } catch (error) {
        next(error)
    }
})



    try {
        const detailsCollaborate = await Collaborate.findById(id)


        res.json(detailsCollaborate)
        
    } catch (error) {
        next(error)
    }
})



// DELETE "/api/collaborate/:id" ruta para borrar una Collaborate por su id.
router.delete("/:id", isAuthenticated, async (req, res, next) => {

    const {id} = req.params

    try {
        await Collaborate.findByIdAndDelete(id)

        res.status(200).json("Elemento Borrado")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/collaborate/:id" ruta para recibir cambios y editar una Collaborate por su id.
router.patch("/:id", isAuthenticated, async (req, res, next) => {
    
    const {id} = req.params
    const {date, title, category, text, owner} = req.body

    try {
        await Collaborate.findByIdAndUpdate(id, {
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
