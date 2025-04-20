const router = require("express").Router();
const { isAdmin } = require("../middleware/auth");
const {
  showLoginForm,
  authenticateAdmin,
  showAddItemForm,
  handleAddItem,
  showManageItems,
  showEditItems,
  handleEditItem,
  handleDeleteItem,
  showManageCat,
} = require("../controllers/adminController");

router.get("/", showLoginForm);

router.post("/login", authenticateAdmin);

router.get("/dashboard", isAdmin, (req, res) => {
  res.render("dashboard", {
    title: "Admin Dashboard",
  });
});

router.get("/add-item", isAdmin, showAddItemForm);
router.post("/add-item", isAdmin, handleAddItem);

router.get("/edit-item/:id", isAdmin, showEditItems);
router.post("/edit-item/:id", isAdmin, handleEditItem);

router.post("/delete-item/:id", isAdmin, handleDeleteItem);
router.get("/manage-items", isAdmin, showManageItems);

router.get("/manage-categories", showManageCat);
module.exports = router;
