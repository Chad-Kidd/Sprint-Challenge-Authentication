const router = require("express").Router();

const Users = require('./users-model')


router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.status(500).json({ message: "SERVER SIDE ERROR" }));
});


router.get("/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err));
});

module.exports = router;