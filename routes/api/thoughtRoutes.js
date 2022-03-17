const router = require('express').Router();
const {
  getThoughts,
  getThought,
  createThought,
  deleteThought,
  
} = require('../../controllers/thoughtController');

// /This is the api to get All Thought
router.route('/').get(getThoughts).post(createThought);

// /This is the api to get One Thought using the ID
router.route('/:thoughtId').get(getThought).delete(deleteThought);


module.exports = router;
