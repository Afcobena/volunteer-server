const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isAuthenticated = require("../middlewares/isAuthenticated")

// POST "/api/auth/signup" ruta para recibir y crear un nuevo User..
router.post("/signup", async (req, res, next) => {

    console.log(req.body)
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
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
            res.status(400).json({errorMessage: "Ya existe un usuario con este nombre"})
            return;
        }

        const foundUser = await User.findOne({email: email})
        console.log(foundUser)
        if (foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con este email"})
            return;
        }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        await User.create({
            username: username,
            email: email,
            password: hashPassword
        })
        res.status(201).json()

        //poner que el usuario tambien sea único
        

    } catch (error) {
        next(error)
    }

})


// POST "/api/auth/login" ruta para mandar las credenciales del User.
router.post("/login", async (req, res, next) => {

    console.log(req.body)
    const {/* username,  */email, password} = req.body

    if(/* !username ||  */!email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
        return;
    }

    try {
        
        const foundUser = await User.findOne({email: email}/* , {username: username} */)

        if (foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        console.log("isPasswordValid", isPasswordValid)
        if (isPasswordValid === false) {
            res.status(400).json({errorMessage: "Contraseña incorrecta"})
            return;
        }


        // TODO-------------Este sería nuestro req.usession.user--------
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            /* username: foundUser.username, */
            /* role: foundUser.role */
        }


        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "24h"}
        )

        res.json({authToken: authToken})

    } catch (error) {
        next(error)
    }
})

// GET "/api/auth/verify" verificar que el User ya ha sido validado y está activo.
router.get("/verify", isAuthenticated, (req, res, next) => {

    console.log("aquí verificamos el token")
    console.log(req.payload)

    res.json(req.payload)
}) 



module.exports = router;

/* 

const router = require("express").Router();
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isAuthenticated = require("../middlewares/isAuthenticated") */

// POST "/api/auth/signup" ruta para recibir y crear un nuevo User..
/* router.post("/signup", async (req, res, next) => {

    console.log(req.body)
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
        return;
    }
 */

    // TODO------------------------------
    // validaciones de password regex aquí
    // validaciones email regex aquí
    // buscar validaciones

    /* try {
        const foundUser = await User.findOne({email: email}, {username: username})
        console.log(foundUser)
        if (foundUser !== null) {
            res.status(400).json({errorMessage: "Ya existe un usuario con este email"})
            return;
        }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        await User.create({
            username: username,
            email: email,
            password: hashPassword
        })
        res.status(201).json() */

        //poner que el usuario tambien sea único
        

    /* } catch (error) {
        next(error)
    }

}) */


// POST "/api/auth/login" ruta para mandar las credenciales del User.
/* router.post("/login", async (req, res, next) => {

    console.log(req.body)
    const {email, password} = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Debes rellenar todos los campos"})
        return;
    }

    try {
        
        const foundUser = await User.findOne({email: email})

        if (foundUser === null) {
            res.status(400).json({errorMessage: "Usuario no registrado"})
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password)
        console.log("isPasswordValid", isPasswordValid)
        if (isPasswordValid === false) {
            res.status(400).json({errorMessage: "Contraseña incorrecta"})
            return;
        }
 */

        // TODO-------------Este sería nuestro req.usession.user--------
        /* const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            username: foundUser.username
        }


        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "24h"}
        )

        res.json({authToken: authToken})

    } catch (error) {
        next(error)
    }
}) */

// GET "/api/auth/verify" verificar que el User ya ha sido validado y está activo.
/* router.get("/verify", isAuthenticated, (req, res, next) => {

    console.log("aquí verificamos el token")
    console.log(req.payload)

    res.json(req.payload)
}) 



module.exports = router; */