const axios = require('axios');
const bcrypt = require('bcryptjs');

// const secrets = require('./secrets');
// const jwt = require("jsonwebtoken");

const generateToken = require('../auth/token-service');
const { restricted } = require('../auth/restricted');

const Users = require('../users/users-model');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', restricted, getJokes);
};

function register(req, res) {
  // implement user registration
  let users = req.body
  const hash = bcrypt.hashSync(users.password, 2);
  users.password = hash;

  Users.add(users)
    .then(saved => {
      //add token
      // const token = tokenService.generateToken(users);
    res.status(201).json(saved);
  })
  .catch(error => {
    res.status(500).json({error: error.message})
})
}

function login(req, res) {
  // implement user login
  let { username, password} = req.body;

  Users.findBy({ username })
  .first()
  .then(users => {
    if (users && bcrypt.compareSync(password, users.password)){
      //add token
      const token = generateToken.generateToken(users);
      res.status(200).json({
        message: `Welcome ${users.username}! Let's pass this SPRINT!!`,
        token,
      })
    } else {
      res.status(400).json({ message: 'Invalid Credentials' })
    }
  })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
