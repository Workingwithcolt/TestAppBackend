import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.send({ message: "User " });
});

export default router;
