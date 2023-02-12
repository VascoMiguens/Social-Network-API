//Import express Router
const router = require("express").Router();
//import all thought and reaction methods
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// route for /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// route for /api/thoughts/:thoughtId
router
  .route("/:videoId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route for /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// route for /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughts/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
