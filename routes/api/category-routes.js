const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      // be sure to include its associated Products
      include: {
        model: Product,
        attributes: ['category_id']
      }
    }
  )
  .then(data => res.json(data))
  .catch(err => {
    res.status(500).json(err);
  });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(data => res.json(data))
    .catch(err => {
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if(!data){
        res.status(404).json({ message: "No Category Found With That ID"});
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err); 
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    if(!data) {
      res.status(404).json({ message: "No Category Found With That ID"});
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
