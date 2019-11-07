// this lsayer cares about interaction with clients

const express = require('express');

const db = require('../data/db-config.js');
const Users = require('./user-model.js')

const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
  db('users')
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  Users.findByID(id)
  // db('users').where({ id })
  .then(users => {
    // const user = users[0];

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

  db('users').insert(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('users').where({ id }).update(changes)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id }).del()
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

// write an endpoint to see a user's posts

router.get('/:id/posts', (req,res)=> {
  /*   select p.contents as Message, u.username as PostedBy 
from users as u
join posts as p on u.id = p.user_id;  */
  db.select('p.contents as Message', 'u.username as PostedBy')
    .from('users as u')
    .join('posts as p', 'u.id', '=', 'p.user_id')
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'error from database'})
    })
})

module.exports = router;