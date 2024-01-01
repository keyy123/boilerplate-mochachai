const { MongoClient } = require('mongodb');
require('dotenv').config();

//connection URL 
const url = process.env.MONGO_URI;
const dbName = process.env.DB || 'Passport-Auth';
const dbCollection = process.env.collection || 'Users';

async function myDB(callback) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('connected to mongoDB');
        await callback(client);
    } catch(error) {
        // await client.close();
        console.error('Error in db link:', error);
    }
}

async function closeDB(client, server) {
    try {
        if (client.isConnected()) {
            await client.close();
            console.log('Connection to DB is closed');
        }
    } finally {
        if (server) {
           server.close(() => {
              console.log('express server closed');
              process.exit(0);
            })
        }   
    }
}



module.exports = {myDB, dbName, dbCollection, closeDB}