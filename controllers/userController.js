const { User, Thought } = require('../models');

// Thought are students
// Course are thought


module.exports = {
  // This is to get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //This is to get one user
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // This creates a user
  createOneUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //This deletes a user
  deleteOneUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts have been deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  
  // This updates a user
  updateOneUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'There is no user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 };
