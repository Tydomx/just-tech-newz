const router = require('express').Router();
const { User, Post, Vote, Comment } = require('../../models');

// GET /api/users (receive data) 
// SQL - SELECT * FROM users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']}
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/:id
// SQL - SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    // this includes an individual's vote data (receive title information of every post user voted on)
    // useful for creating frontend user profile page
    include: [
      {
        model: Post,
        attributes: [
          'id',
          'title',
          'post_url',
          'createdAt'
        ]
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'createdAt'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' })
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// POST /api/users
// SQL - INSERT INTO users (username, email, password)
// --> VALUES ('Lernantino', 'lernantino@gmail.com', 'password123')
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users/login
// queries User table using findOne method for email entered and assigns to req.body.email
// if user w that email not found, message is sent back as res to client. if email is found in db, verfication of user's identity by matching password from user and hashed password from db (promise)
router.post('/login', (req,res)=>{
// expects {email: 'modyt@gmail.com', password: 'password123'}
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with this email!' });
      return;
    }
    // res.json({ user: dbUserData });

    // verify user
    // instance method called on user retrieved from db
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password!' });
      return;
    }
    res.json({ user: dbUserData, message: 'You are now logged in!' });

  });
});

// UPDATE /api/users/1
// SQL - UPDATE users
// --> SET username = 'Lernantino', email = 'lernantino@gmail.com', password = 'password123'
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password123'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
