const router = require('express').Router();
const { getUsers } = require('../../controllers/userController');
const {
  getUsers,
  getOneUser,
  createOneUser,
  deleteOneUser,
  updateOneUser,
  //addFriend,
  //removeFriend,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createOneUser);

// /api/students/:studentId
router.route('/:userId').get(getOneUser).delete(deleteOneUser);

// /api/students/:studentId/assignments
router.route('/:userId').get(getOneUser).put(updateOneUser);

// /api/students/:studentId/assignments/:assignmentId

module.exports = router;