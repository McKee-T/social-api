const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/usersController');

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
