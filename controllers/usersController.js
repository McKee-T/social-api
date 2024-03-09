const User = require('../models/User');

const usersController = {
    // Create a new User
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Get all Users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get a single User by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a User by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Delete a User by id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json({ message: 'User successfully deleted!' });
            })
            .catch((err) => res.status(500).json(err));
    },

    // Add a Friend to a User's friend list
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Remove a Friend from a User's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, { $pull: { friends: req.params.friendId } }, { new: true })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(user);
            })
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = usersController;
