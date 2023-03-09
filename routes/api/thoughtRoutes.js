const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

router
    .route("/")
    .get(getThoughts)
    .post(createThought);

router
    .route("/:thoughtsId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


router.route("/:thoughtsId/reactions/:reactionId").delete(deleteReaction);
router.route("/:thoughtsId/reactions").post(createReaction);


module.exports = router;