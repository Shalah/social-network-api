const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
  
} = require('../../controllers/thoughtController');

// /This is the api to get All Thought
router.route('/').get(getThoughts)

// Creates one thought
router.route('/').post(createThought);
   
// /This is the api to get One Thought using the ID
router.route('/:thoughtId').get(getOneThought)

// Updates one thought
router.route('/:thoughtId').put(updateThought)

// Deletes one thought
router.route('/:thoughtId').delete(deleteThought);

// This is the adding reaction feature

router.route('/:thoughtId/reactions').post(addReaction);

// This removes the reaction feature
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);




module.exports = router;
