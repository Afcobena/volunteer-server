const router = require("express").Router();
const Collaborate = require("../models/Collaborate.model")
const Proposal = require("../models/Proposal.model")
const User = require("../models/User.model")

const isAuthenticated = require("../middlewares/isAuthenticated")




// GET "/api/collaborate" ruta para ver todos los Collaborate.
router.get("/", async (req, res, next) => {

    const {owner, proposal} = req.body

    try {
        const allCollaborate = await Collaborate.find().populate(owner).populate(proposal)
        res.json(allCollaborate);

    } catch (error) {
        next(error)
    }

    
  
});


// POST "/api/collaborate" ruta para crear un nuevo Collaborate.
router.post("/", /* isAuthenticated, */ async (req, res, next) => {

    const {id} = req.params
    /* console.log(req.body) */
    const {category, proposal, owner, text} = req.body

    try {
        await Proposal.findById(id)
        const newCollaborate = await Collaborate.create({
            category,
            text,
        })/* .populate("proposal").populate("owner") */
        console.log("creado un collaborate")
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




// DELETE "/api/collaborate/:id" ruta para borrar una Collaborate por su id.
router.delete("/:id", /* isAuthenticated, */ async (req, res, next) => {

    const {id} = req.params

    try {
        await Collaborate.findByIdAndDelete(id)

        res.status(200).json("Elemento Borrado")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/collaborate/:id" ruta para recibir cambios y editar una Collaborate por su id.
router.patch("/:id", /* isAuthenticated, */ async (req, res, next) => {
    
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
