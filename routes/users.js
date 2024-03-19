
import { Router } from "express";
const router = Router();

router.get(
  "/",
  async function (req, res) {
    let query = req.query ? req.query : {};
    var usersController =
      req.locals.controllerFactory.getUserController(req.locals)
    var results =
      await usersController.getOne(query);

    res.send(results);
  }
);

router.post('/', async (req, res) => {
  console.log("print data");
  console.log(req.body);
  var AccountController =
    req.locals.controllerFactory.getUserController(req.locals)
  var results =
    await AccountController.create(req.body)

  res.send(results);
})

router.put("/",
  async function (req, res) {
    let query = req.query ? req.query : {};
    var accountsController =
      req.locals.controllerFactory.getUserController(req.locals);
    let result = await accountsController.update(
      query,
      req.body
    )
    res.send(result)
  });

router.delete("/",

  async function (req, res) {
    let query = req.query ? req.query : {};
    var accountsController =
      req.locals.controllerFactory.getUserController(req.locals);

    let result = await accountsController
      .delete(query)
    res.send(result)
  });

export default router