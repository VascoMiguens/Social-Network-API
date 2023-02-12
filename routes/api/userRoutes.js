const router = require("express").Router();
//import all user methods
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getUserFriend,
  deleteUserFriend,
} = require("../../controllers/usersController");

// route for /api/users
router.route("/").get(getUsers).post(createUser);

// route for /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//route for /api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .get(getUserFriend)
  .delete(deleteUserFriend);
module.exports = router;
