const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express()

const corsPolicy = require("../middlewares/corsPolicy")

const isAuthenticated = require("../middlewares/isAuthenticated")

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use(cors())


// POST "/api/auth/signup" ruta para recibir y crear un nuevo User..
router.post("/signup", cors(corsOptions), async (req, res, next) => {

    console.log(req.body)
    const {username, email, password, role} = req.body

    if(!username || !email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"}).sendStatus(200)
        return;
    }


    // TODO------------------------------
    // validaciones de password regex aquí
    // validaciones email regex aquí
    // buscar validaciones

    try {

        const foundUserByUsername = await User.findOne({username: username})
        console.log(foundUserByUsername)
        if (foundUserByUsername !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con este nombre"}).sendStatus(200)
            return;
        }

        const foundUser = await User.findOne({email: email})
        console.log(foundUser)
        if (foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con este email"}).sendStatus(200)
            return;
        }


        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        await User.create({
            username: username,
            email: email,
            password: hashPassword,
            role: role
        })
        res.status(201).json().sendStatus(200)

        //poner que el usuario tambien sea único
        

    } catch (error) {
        next(error)
    }

})


// POST "/api/auth/login" ruta para mandar las credenciales del User.
router.post("/login", cors(corsOptions), async (req, res, next) => {

    console.log("ESTE ES EL REQ.BODY:",req.body)
    const {username, email, password, role} = req.body

    if(/* !username ||  */!email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"}).sendStatus(200)
        return;
    }

    try {
        
        const foundUser = await User.findOne({email: email})

        if (foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"}).sendStatus(200)
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        console.log("isPasswordValid", isPasswordValid)
        if (isPasswordValid === false) {
            res.status(400).json({errorMessage: "Contraseña incorrecta"}).sendStatus(200)
            return;
        }


        // TODO-------------Este sería nuestro req.usession.user--------
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username,
            role: foundUser.role
        }


        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "24h"}
        )

        res.json({authToken: authToken}).sendStatus(200)

    } catch (error) {
        next(error)
    }
})

// GET "/api/auth/verify" verificar que el User ya ha sido validado y está activo.
router.get("/verify", isAuthenticated, cors(corsOptions), (req, res, next) => {

    console.log("aquí verificamos el token")
    console.log("consoleLog", req.payload)

    res.json(req.payload).sendStatus(200)
}) 



module.exports = router;