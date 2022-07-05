// including packages and modesl for Express.js API endpoints
const router = require('express').Router();
const { Post, User } = require('../../models');

// getting all of the users
router.get('/', (req, res) => {
  console.log('================');
  Post.findAll({
    // configuring findAll method by customizing attributes property
    attributes: ['id', 'post_url', 'title', 'createdAt'],
    // order prop to show client most recently added posts first, nested array that orders by createdAt column in descending order
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// getting information from one user
// GET /api/posts/1
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_url', 'title', 'createdAt'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(400).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/posts
router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// PUT route /api/posts/1 (updating)
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
      // this replaces the title of the post (body)
    },
    {
      where: {
        id: req.params.id
        // this finds the post (params)
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE route /api/posts/1 (deleting)
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;