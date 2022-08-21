const router = require("express").Router();
const proposalRoutes = require("./proposal.routes")
const authRoutes = require("./auth.routes")
const collaborateRoutes = require("./collaborate.routes")


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes)

router.use("/proposal", proposalRoutes)

router.use("/collaborate", collaborateRoutes)


module.exports = router;
