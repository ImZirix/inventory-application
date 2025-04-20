const { getAllItems, getItem } = require("../db/queries");

const showItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.render("items", {
      items,
      title: "Items",
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).send("Error fetching items");
  }
};
const showItem = async (req, res) => {
  try {
    const itemName = req.params.name;
    const item = await getItem(itemName);
    res.render("item", {
      item,
      title: item,
    });
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).send("Error fetching item");
  }
};

module.exports = { showItems, showItem };
