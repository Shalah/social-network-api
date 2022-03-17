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
router.route('/').get(getUsers);

// Route to create a user
router.route('/').post(createOneUser);

// /This is the api for One User (Used to delete)
router.route('/:userId').get(getOneUser)

//This is used to depete a user
router.route('/:userId').delete(deleteOneUser);

// // /This is the api for One User (Used to update)
router.route('/:userId').get(getOneUser)

// This is used to update
router.route('/:userId').put(updateOneUser);


module.exports = router;