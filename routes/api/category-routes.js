const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  const find = await Category.findAll({ include: Product });

  res.json(find);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  const find = await Category.findByPk(req.params.id, {
    include: Product,
  });

  res.json(find);
});

router.post("/", async (req, res) => {
  // create a new category
  const create = await Category.create({
    category_name: req.body.category_name,
  });

  res.json(create);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const update = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  if (!update[0]) {
    res.status(404).json({ msg: "No such category" });
  } else {
    res.json(update);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!deleteCategory) {
    res.status(404).json({ msg: "No such category" });
  } else {
    res.json(deleteCategory);
  }
});

module.exports = router;
