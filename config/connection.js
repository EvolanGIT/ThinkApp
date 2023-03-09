require("dotenv").config()
const { connect, connection } = require('mongoose');

const connectionString =  process.env.MONGO_DB || 'mongodb://localhost:27017/thoughtsNoSQLDB';

connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

module.exports = connection;