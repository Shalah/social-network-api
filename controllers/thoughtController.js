const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
          // reactionCount: await reactionCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(async (thought) =>
        !thought // ternary operator
          ? res.status(404).json({ message: "No thought with that ID" }) // This is the if
          : res.json({
              // This is the else
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              //.status(404)
              .json({ message: "Thought was created" })
          : res.json(" Thought was created")
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought and remove them from the user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "There is no thought associated with this ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "No User found, but Thought Deleted",
            })
          : res.json({ message: "Thought deleted!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "There is no thought associated with this id.",
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // This creates a Reaction

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "There is no reaction associated with this id.",
            })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // find and delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({
              message: "There is no thought associated with this id.",
            })
          : res.json({ message: "Reation has been deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
