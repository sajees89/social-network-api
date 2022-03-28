const { User, Thought } = require('../models');

const userController = {

    // GET all users
    getAllUsers: (req, res) => {
        User.find({})
          .populate([
            {
                path: 'thoughts',
                select: '-__v',
            },
            {
                path: 'freinds',
                select: '-__v'
            }
          ])
          .select('-__v')
          .sort({ _id: -1 })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // GET user by id
    getUserById: (req, res) => {
        User.findOne({ _id: req.params.id })
          .populate([
            {
                path: 'thoughts',
                select: '-__v',
            },
            {
                path: 'freinds',
                select: '-__v'
            }
          ])
          .select('-__v')
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);  
            res.status(400).json(err);
        });
      },
      // POST a user
      createUser({ body }, res) {
        User.create(body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(400).json(err));
      },
      // PUT update user
      updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
    // DELETE user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },

    // POST friend
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            { $push: { friends: params.friendId } }, 
            { new: true, runValidators: true } 
           )
            .then((dbUserData) => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
    // DELETE friend
      deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, 
            { $pull: { friends: params.friendId } }, 
            { new: true, runValidators: true } 
           )
            .then((dbUserData) => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      },
    };

    module.exports = userController;