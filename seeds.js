require('dotenv').config();
const mongoose = require('mongoose');
const { User, Thought } = require('./models');

mongoose.connect(process.env.MONGODB_URI);

const users = [
  {
    username: 'userOne',
    email: 'userone@example.com',
    thoughts: [],
    friends: [],
  },
  {
    username: 'userTwo',
    email: 'usertwo@example.com',
    thoughts: [],
    friends: [],
  },
  // Add more user objects as needed
];

const thoughts = [
  {
    thoughtText: 'This is a thought from userOne.',
    username: 'userOne',
    reactions: [
      {
        reactionBody: 'This is a reaction from userTwo.',
        username: 'userTwo',
      },
      // Add more reactions as needed
    ],
  },
  // Add more thought objects as needed
];

const seedDB = async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});
  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  console.log('Database seeded! 🌱');
  process.exit(0);
};

seedDB().catch(err => {
  console.error(err);
  process.exit(1);
});
