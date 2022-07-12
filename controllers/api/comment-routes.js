const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route /api/comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST route /api/comments
router.post('/', withAuth, (req, res) => {
  // check session
  // if statements allow only logged-in users to interact w/ the database
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      // use id from session
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// DELETE route /api/comments/:id
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(400).json({ message: 'No comment found with this ID!' });
        return;
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;