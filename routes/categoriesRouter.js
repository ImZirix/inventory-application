const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

router.get("/", categoriesController.showCategories);
router.get("/:name", categoriesController.showCategoryByName);

module.exports = router;
