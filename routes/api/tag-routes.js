const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
try{
  const tagAll = await Tag.findAll({
    include: [{ model: Product }, { model: ProductTag }],
  });
  res.status(200).json(tagAll);
}
catch (err){
  res.status(500).json(err);
}
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try{
    const tagOne = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }, { model: ProductTag }],
    });
    if (!tagOne){
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagOne);
  }
  catch (err){
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try{
    const tagNew = await Tag.create(req.body);
    res.status(200).json(tagNew);
  }
  catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagUpdate[0]){
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagUpdate);
  }
  catch (err){
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelete){
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagDelete);
  }
  catch (err){
    res.status(500).json(err);
  }
});

module.exports = router;
