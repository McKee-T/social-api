require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require('./routes'); // Assuming `index.js` inside `routes` directory aggregates all routes

app.use(express.json());
app.use('/api', apiRoutes); // Prefixing all routes defined in `apiRoutes` with `/api`

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(routes);

// Here, process.env.MONGODB_URI will be used if defined, otherwise the fallback URL
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetworkDB');
app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
