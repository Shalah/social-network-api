const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  createOneUser,
  deleteOneUser,
  updateOneUser,
  //addFriend,
  //removeFriend,
} = require('../../controllers/userController');

// /This is the api for All Users
router.route('/').get(getUsers).post(createOneUser);

// /This is the api for One User (Used to delete)
router.route('/:userId').get(getOneUser).delete(deleteOneUser);

// /This is the api for One User (Used to update)
router.route('/:userId').get(getOneUser).put(updateOneUser);

// /api/students/:studentId/assignments/:assignmentId

module.exports = router;