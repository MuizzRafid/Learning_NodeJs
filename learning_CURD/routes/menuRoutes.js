const express = require("express");

const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  console.log("POST /menu called");

  try {
    const data = req.body;

    const newMenu = new MenuItem(data);
    const response = await newMenu.save();

    console.log("Menu saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "menu not saved server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:taste", async (req, res) => {
  const tasteSearch = req.params.taste;
  try {
    if (
      tasteSearch == "Spicy" ||
      tasteSearch == "Sour" ||
      tasteSearch == "Sweet"
    ) {
      const response = await MenuItem.find({ taste: tasteSearch });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid taste Search" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "invalid srever Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updateData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ error: "menu item not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "invalid server" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res
        .status(404)
        .json({ error: "menu item not found and not deleted" });
    }
    res.status(200).json({ message: "menu deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "invalid server" });
  }
});

module.exports = router;
