const router = require("express").Router();
const proposalRoutes = require("./proposal.routes")

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇

router.use("/proposal", proposalRoutes)
// example: router.use("/auth", authRoutes)

module.exports = router;
