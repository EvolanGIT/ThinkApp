const {populate} = require('../models/Thought');
const {Thought, User} = require('../models');

module.exports = {
//GET to get all thoughts
getThoughts(req, res) {
Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},

//GET thought by ID
getSingleThought(req, res) {
Thought.findOne({ _id: req.params.thoughtsId })
    .select("-__v")
    .lean()
    .then(async (thought) =>
    !thought
        ? res.status(404).json({ message: "No thoughts found with this id." })
        : res.json(thought)
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},

//POST to create a new thought 
createThought(req, res) {
Thought.create(req.body)
    .then((thought) => {
    return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
    );
    })
    .then((user) =>
    !user
        ? res.status(404).json({
            message: "Thought made, but no user found with this id.",
        })
        : res.json("Thought Posted")
    )
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
    });
},

//PUT thought by ID
updateThought(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtsId },
    { $set: req.body },
    { runValidators: true, new: true }
)
    .then((thought) =>
    !thought
        ? res
            .status(404)
            .json({ message: "No thought to update with this id." })
        : res.json(thought)
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},

//DELETE thought by ID
deleteThought(req, res) {
Thought.findOneAndDelete({ _id: req.params.thoughtsId })
    .then((thought) =>
    !Thought
        ? res
            .status(404)
            .json({ message: "No thought to delete with this id." })
        : res.json(thought)
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},

//POST Reaction
createReaction(req, res) {
Thought.findOneAndUpdate(
    { _id: req.params.thoughtsId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
)
    .then(async (thought) =>
    !thought
        ? res
            .status(404)
            .json({
            message: "No thought to add reaction to found with that id.",
            })
        : res.json({ message: "Reaction Posted!!!" })
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},

//DELETE reaction by it's reactionId value
deleteReaction({ params }, res) {
Thought.findOneAndUpdate(
    { _id: params.thoughtsId },
    { $pull: { reactions: params.reactionId } },
    { new: true }
)
    .select("-__v")
    .populate("reactions")
    .then((thought) =>
    !thought
        ? res
            .status(404)
            .json({
            message:
                "No Thought to delete reaction from found with that id.",
            })
        : res.json({ message: "Reaction deleted!" })
    )
    .catch((err) => {
    console.log(err);
    return res.status(500).json(err);
    });
},
};