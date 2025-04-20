const router = require("express").Router();
const itemsController = require("../controllers/itemsController");

router.get("/", itemsController.showItems);
router.get("/:name", itemsController.showItem);

module.exports = router;
