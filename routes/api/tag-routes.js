const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  const findTags = await Tag.findAll({ include: Product });
  res.json(findTags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  const findOneTag = await Tag.findByPk(req.params.id, {
    include: Product,
  });
  if (!findOneTag) {
    res.status(404).json({ msg: "No such tag" });
  } else {
    res.json(findOneTag);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  const createTag = await Tag.create({
    tag_name: req.body.tag_name,
  });

  res.json(createTag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  if (!updateTag[0]) {
    res.status(404).json({ msg: "No such tag" });
  } else {
    res.json(updateTag);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const deleteTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!deleteTag) {
    res.status(404).json({ msg: "No such tag" });
  } else {
    res.json(deleteTag);
  }
});

module.exports = router;
