## Implement the Serialization of a Passport User

### What now:

- Since our DB is not setup, we can't load actual user objects from DB. 
- We need to link to the DB to our express server, and keep the connection open when app is running. 

### How do we link DB to our express server?
- Make a file called `connection.js`
- Create a function that makes a connection to MongoDB database and stays on until other actions are complete
- Create a function that will wait until the client disconnects from DB then closes app's server
- Create a function that will wait until the DB connection is made before reading the express routes

### How to make a mongoDB database connection function (connection.js)?
1. Import `mongodb` as a dependency and import into file (connection.js). Destructure out `MongoClient`

```js
const { MongoClient } = require('mongodb');
```

2. Create and store mongo db url, database name, and collection name as variables
```js
const url = process.env.MONGO_URI || 'http://localhost:27017';
const dbName = process.env.DB || 'DB_NAME';
const dbCollection = process.env.collection || 'COLLECTION_NAME'

// good practice is to use env variables and default to local settings.
```

3. Make an async function that takes a callback as a parameter 
```js
async function myDB(callback) {
    // code here in next steps
}
```

4. Create and store a new `mongoclient` instance with the database url passed in with other options if needed
```js
async function myDB(callback) {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
    // code here in next steps
}
```

5. Use try/catch block to connect to the mongoClient to the database and log to the console and wait for callback with client passed in
```js
async function myDB(callback) {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
    
    try {
        await client.connect();
        console.log('message to show client linked to db');
        await callback(client);
    } catch (error) {
        console.log('Error linking to DB:', error)
    }
}
```

note = export it 

### How to make a function that close DB link and server together (connection.js)?

1. Make an async function that takes in client and server as parameters:
```js
async function closeDB(client, server) {
    // code in next steps
}
```

2. Make a try/finally block with conditional that checks if client is connected to DB via Client object's `isConnected()` method. If client is connected to DB, wait for client to close connection with `close()` method and log to console (check npm mongodb package for info):
```js
async function closeDB(client, server) {
    try {
        if(client.isConnected()) {
            await client.close();
            console.log('Connection to DB is closed!')
        }
    } finally {
        // code in next step
        
        // will do this whether there is an error or not
    }
}
```

3. Within the `finally` block, Check if the server is available. If it is use the Server object's `close()` with an empty callback that tells dev that the server is closed and exits with status code 0
```js
async function closeDB(client, server) {
    try {
        if(client.isConnected()) {
            await client.close();
            console.log('Connection to DB is closed!')
        }
    } finally {
        // code in next step
        if(server){
            server.close(() => {
                console.log('tell dev or user that server is closing')
                process.exit(0);
            })
        }
    }
}
```

module.exports = {myDB, closeDB, dbName, dbCollection};

### How to create a function that waits until DB link is made before reading api routes?

1. Import DB function from connection.js
```js 
const {myDB} = require('./connection.js');
```

2. Invoke the db fxn and create an async callback that takes in a client instance as a parameter that will also catch an error and do something with it 
```js
myDB(async (client) => {
    // code here 

}).catch(e => {
    // some logic. I won't be going into it here...
});
```

3. Move all api routes and logic to listen to server in the async callback
```js
myDB(async (client) => {
    // code here 

    ***
    // api routes
    app.get('/', (req, res) => {
        res.send('hi');
    });
    
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
    });
    ***
}).catch(e => {
    // some logic. I won't be going into it here...
});
```

4. Save db collection as a variable using `client` object's `db` and `collection` method
```js
myDB(async (client) => {
    ***
    const myDataBase = await client.db('mongo_database_name').collection('mongo_collection_name');
    ***

    // api routes
    app.get('/', (req, res) => {
        res.send('hi');
    });
    
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
    });
}).catch(e => {
    // some logic. I won't be going into it here...
});
``` 

5. Move passport auth logic within the same function 
```js
myDB(async (client) => {
    ***
    const myDataBase = await client.db('mongo_database_name').collection('mongo_collection_name');
    ***

    // api routes
    app.get('/', (req, res) => {
        res.send('hi');
    });

***
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
        
    passport.deserializeUser((id, done) => {
        myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => { //use db connection to access object
            done(null, doc);
        })
    })
***
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
    });



}).catch(e => {
    // some logic. I won't be going into it here...
});
```

6. Set the process (app instance) to listen for a signal interrupt event then wait to use closeDB with the client and server passed in as arguments
```js
myDB(async (client) => {
    const myDataBase = await client.db(dbName).collection(dbCollection);
    app.get('/', (req, res) => {
        res.render('index', { title: 'Connected to Mongo', message: 'Please login' });
    })
    
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
        
    passport.deserializeUser((id, done) => {
        myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
            done(null, doc);
        })
    })

    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
    });


    ***
    process.on('SIGINT', async () => {
        await closeDB(client, server);
    });
    ***


}).catch(e => {
    app.get((req, res) => {
        res.render('index', { title: e, message: 'Unable to link to mongo db' })
    });
});
```

### Personal Questions

1. What are real world context(s) to use serialization/deserialization besides just auth?

2. When shouldn't you use de/serialization?

3. What are better alternatives in weaker use-cases?

4. Give code examples in each case to the above questions...


Resources: 
[express-session](https://www.npmjs.com/package/express-session)
[passport](https://www.npmjs.com/package/passport)
[mongodb](https://www.npmjs.com/package/mongodb)