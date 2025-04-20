require("dotenv").config();
const { render } = require("ejs");
const {
  addNewItem,
  getAllCategories,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../db/queries");
const showLoginForm = (req, res) => {
  res.render("login", {
    title: "Admin login",
  });
};

const authenticateAdmin = (req, res) => {
  const { username, password } = req.body;
  if (username === "GALIO" && password === "123") {
    req.session.isAdmin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.status(401).send("Unauthorized: Incorrect username or password");
  }
};

const showAddItemForm = async (req, res) => {
  const categories = await getAllCategories();
  res.render("adminAddItem", { title: "Bonjour", categories });
};
const handleAddItem = (req, res) => {
  try {
    const { name, description, stock, price, category_id } = req.body;
    addNewItem(name, description, stock, price, category_id);
    res.redirect("/items");
  } catch (err) {
    console.error("Error adding item: ".err);
  }
};

const showManageItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.render("manageItems", { title: "Manage items", items });
  } catch (err) {
    console.error("Error fetching items: ", err);
    res.status(500).send("Something went wrong");
  }
};
const showEditItems = async (req, res) => {
  try {
    const categories = await getAllCategories();
    const item = await getItemById(req.params.id);
    res.render("editItem", {
      item,
      title: `${item.name}`,
      categories,
    });
  } catch (err) {
    console.error("Error fetching item: ", err);
  }
};

const handleEditItem = async (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  try {
    await updateItem(req.params.id, {
      name,
      description,
      price,
      stock,
      category_id,
    });
    res.redirect("/admin/manage-items");
  } catch (err) {
    console.error("Error editing item:", err);
  }
};

const handleDeleteItem = async (req, res) => {
  try {
    await deleteItem(req.params.id);
    res.redirect("/admin/manage-items");
  } catch (err) {
    console.error("Error deleteing item: ", err);
  }
};

const showManageCat = async (req, res) => {
  try {
    const cat = await getAllCategories();
    res.render("manageCat", { title: "Manage Categories", cat });
  } catch (err) {
    console.error("Error fetching categoies: ", err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  showLoginForm,
  authenticateAdmin,
  showAddItemForm,
  handleAddItem,
  showManageItems,
  showEditItems,
  handleEditItem,
  handleDeleteItem,
  showManageCat,
};
