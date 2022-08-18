const router = require("express").Router();
const Proposal = require("../models/Proposal.model")



// GET "/api/proposal" ruta para enviar todas las Proposals.
router.get("/", async (req, res, next) => {

    try {
        const allProposals = await Proposal.find()
        res.json(allProposals);

    } catch (error) {
        next(error)
    }

    
  
});


// GET "/api/proposals" ruta para recibir y crear una nueva Proposal.
router.post("/", async (req, res, next) => {

    /* console.log(req.body) */

    const {date, title, category, text, owner} = req.body

    try {
        const newProposal = await Proposal.create({
            date,
            title,
            category,
            text,
            owner
        })
        res.json("creado");

    } catch (error) {
        next(error)
    }
  
});


// GET "/api/proposals/:id" ruta para enviar todas los detalles de una Proposal en especifico.
router.get("/:id", async (req, res, next) => {

    /* console.log(req.params) */
    const {id} = req.params

    try {
        const detailsProposal = await Proposal.findById(id)


        res.json(detailsProposal)
        
    } catch (error) {
        next(error)
    }
})


// GET "/api/proposals/:id" ruta *POPULATE* para enviar los detalles de una Proposal al /PERFIL.



// TODO-------------------------Bonus--------------------------------------

// DELETE "/api/proposals/:id" ruta para borrar una Proposal por su id.
router.delete("/:id", async (req, res, next) => {

    const {id} = req.params

    try {
        await Proposal.findByIdAndDelete(id)

        res.status(200).json("Elemento Borrado")
    } catch (error) {
        next(error)
    }
})

// PATCH "/api/proposals/:id" ruta para recibir cambios y editar una Proposal por su id.
router.patch("/:id", async (req, res, next) => {
    
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

// TODO-------------------------Bonus--------------------------------------


module.exports = router;
