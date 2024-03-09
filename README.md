# Social Network API

This Social Network API is a backend application that allows users to share thoughts, react to friends' thoughts, and create a friend list. Built with Express.js for routing, MongoDB for the database, and Mongoose ODM for data modeling, it provides a solid foundation for a social networking application.

## Features

- User creation, update, and deletion
- Add and remove friends to a user's friend list
- Post thoughts
- Update and delete thoughts
- Add and remove reactions to thoughts

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/McKee-T/social-api.git
cd social-api
npm install
```

## Usage

Start the server by running:

```bash
npm start
```

This will launch the server, typically on `http://localhost:3000`, and connect to the MongoDB database.

## API Endpoints

### Users

- `GET /api/users`: Fetch all users
- `POST /api/users`: Create a new user
- `GET /api/users/:id`: Fetch a single user by ID
- `PUT /api/users/:id`: Update a user by ID
- `DELETE /api/users/:id`: Delete a user by ID
- `POST /api/users/:id/friends/:friendId`: Add a friend to a user's friend list
- `DELETE /api/users/:id/friends/:friendId`: Remove a friend from a user's friend list

### Thoughts

- `GET /api/thoughts`: Fetch all thoughts
- `POST /api/thoughts`: Create a new thought
- `GET /api/thoughts/:id`: Fetch a single thought by ID
- `PUT /api/thoughts/:id`: Update a thought by ID
- `DELETE /api/thoughts/:id`: Delete a thought by ID

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought

## Models

### User

- Username (String, required, unique)
- Email (String, required, unique, match a valid email format)
- Thoughts (Array of references to the Thought model)
- Friends (Array of references to the User model)

### Thought

- Thought Text (String, required, 1-280 characters)
- Created At (Date, default to the current timestamp)
- Username (String, required)
- Reactions (Array of Reaction subdocuments)

### Reaction (Subdocument in Thought)

- Reaction ID (Mongoose ObjectId, default to a new ObjectId)
- Reaction Body (String, required, 280 characters max)
- Username (String, required)
- Created At (Date, default to the current timestamp)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

This project is released under the [MIT License](LICENSE).
