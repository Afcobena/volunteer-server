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
            res.status(401).json({errorMessage: "No tienes permiso para editar esto"}) //quizas mejor poner un {errorMessage: "No tienes permiso para editar esto"}
        }
    } catch (error) {
        next(error)
    }
}

//async.  tarer parametro que hayamos pasado. despues vamos a buscas la que se corresponda con esa id. accedemos a la propiedad.owner. hacemos un condicional en el que ckeamos el owner de es objeto y que se compare con el payloa_id si es true next, si no error tiene que hacerse con 2 iguales == 


// bloquear botones front: chekear el user._id es igual que el id del que esta conectado == ternario user._id es igual a eachProposal.owner._id 


module.exports = {
    isOwner,
}