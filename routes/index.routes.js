const router = require("express").Router();
const proposalRoutes = require("./proposal.routes")
const authRoutes = require("./auth.routes")


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRoutes)


router.use("/proposal", proposalRoutes)
// example: router.use("/auth", authRoutes)

module.exports = router;
