const router = require("express").Router();
const proposalRoutes = require("./proposal.routes")
const authRoutes = require("./auth.routes")
const collaborateRoutes = require("./collaborate.routes")
const profileRoutes = require("./profile.routes")


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes)

router.use("/proposal", proposalRoutes)

router.use("/collaborate", collaborateRoutes)

router.use("/profile", profileRoutes)


module.exports = router;
