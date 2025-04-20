const { getAllCategories, getItemsByCatName } = require("../db/queries");

const showCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render("categories", {
      categories,
      title: "Categories",
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Error fetching categories");
  }
};

const showCategoryByName = async (req, res) => {
  try {
    catName = req.params.name;
    const items = await getItemsByCatName(catName);

    res.render("category", {
      title: catName,
      categoryName: catName,
      items,
    });
  } catch (err) {
    console.error("error", err);
  }
};

module.exports = { showCategories, showCategoryByName };
