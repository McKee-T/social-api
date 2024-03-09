const { Thought, User } = require('../models');

const thoughtsController = {
    // Create a new Thought and associate it with a User
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findByIdAndUpdate(
                    req.body.id,
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'Thought created, but no user found with this id!' });
                    return;
                }
                res.json({ message: 'Thought successfully created!' });
            })
            .catch(err => res.status(500).json(err));
    },

    // Get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },

    // Get a single Thought by id
    getThoughtById(req, res) {
        Thought.findById(req.params.id)
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(500).json(err));
    },

    // Update a Thought
    updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(500).json(err));
    },

    // Delete a Thought and remove it from the associated User
    deleteThought(req, res) {
        Thought.findByIdAndDelete(req.params.id)
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findByIdAndUpdate(
                    thought.userId,
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                );
            })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'Thought deleted, but no user found with this id!' });
                    return;
                }
                res.json({ message: 'Thought successfully deleted!' });
            })
            .catch(err => res.status(500).json(err));
    },

    // Add a Reaction to a Thought
    addReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(thought);
            })
            .catch(err => res.status(500).json(err));
    },

    // Remove a Reaction from a Thought
    removeReaction(req, res) {
        Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json({ message: 'Reaction successfully removed!' });
            })
            .catch(err => res.status(500).json(err));
    }
};

module.exports = thoughtsController;
