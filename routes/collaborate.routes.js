const router = require("express").Router();
const Collaborate = require("../models/Collaborate.model")
const Proposal = require("../models/Proposal.model")
const User = require("../models/User.model")

const isAuthenticated = require("../middlewares/isAuthenticated");
const arrCollaborations = require("../utils/collaborations");


// POST "/api/collaborate" ruta para crear un nuevo Collaborate.
router.post("/:proposalId", isAuthenticated, async (req, res, next) => {

    const {proposalId} = req.params
    const userId = req.payload._id
    const {category, text} = req.body

    try {
        const newCollaborate = await Collaborate.create({
            category,
            text,
            owner: userId,
            proposal: proposalId,
        })
        console.log("creado un collaborate")
        res.json(newCollaborate);
    } catch (error) {
        next(error)
    }
});


// GET "/api/collaborate" ruta para ver todos los Collaborate.
router.get("/:proposalId", async (req, res, next) => {

    /* const {owner} = req.body */

    const {proposalId} = req.params

    try {
        const allCollaborate = await Collaborate.find({proposal: proposalId}).populate("owner")
        /* console.log("TIENE ESTO", allCollaborate) */
        res.json(allCollaborate);

    } catch (error) {
        next(error)
    }
});


// GET "/api/collaborate/:id" ruta para enviar todas los detalles de una Collaborate.
router.get("/:proposalId/:collaborateId",/*  isAuthenticated, */ async (req, res, next) => {

    const {proposalId, collaborateId} = req.params

    try {
        const detailsCollaborate = await Collaborate.findOne({
          _id: collaborateId,
          proposal: proposalId,
        }).populate("owner");
        console.log("DETAILS:", detailsCollaborate);


        res.json(detailsCollaborate)
        
    } catch (error) {
        next(error)
    }
})

// VER COMO SE HACE CON LAS IDS DINAMICAS EN LOS DELETE Y PATCH


// DELETE "/api/collaborate/:id" ruta para borrar una Collaborate por su id.
router.delete("/:proposalId", /* isAuthenticated, */ async (req, res, next) => {

    const {proposalId} = req.params

    try {
        await Collaborate.findByIdAndDelete(proposalId)

        res.status(200).json("Elemento Borrado")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/collaborate/:id" ruta para recibir cambios y editar una Collaborate por su id.
router.patch("/:proposalId", /* isAuthenticated, */ async (req, res, next) => {
    
    const {proposalId} = req.params
    const {date, title, category, text, owner} = req.body

    try {
        await Collaborate.findByIdAndUpdate(proposalId, {
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
