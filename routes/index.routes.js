const router = require("express").Router();
const proposalRoutes = require("./proposal.routes")
const authRoutes = require("./auth.routes")
const collaborateRoutes = require("./collaborate.routes")
const profileRoutes = require("./profile.routes")


router.get("/", (req, res, next) => {
  const htmlResponse = 
  `
  <html>

    <head>
      <title>Volunteer Server App</title>
    </head>
    <body>
      <h1>Volunteer Server Running</h1>
    </body>
  </html>
  `;
  res.send(htmlResponse).json("All good in here");
});

router.use("/auth", authRoutes)

router.use("/proposal", proposalRoutes)

router.use("/collaborate", collaborateRoutes)

router.use("/profile", profileRoutes)


module.exports = router;
