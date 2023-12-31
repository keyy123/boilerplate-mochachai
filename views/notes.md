## Set up passport

- Goal(s):
    * Use passport to start user sign up and login to an account
    * Use `express-session` to handle sessions 
    * Learn how to use sessions for applications

### Why use express-sessions?
- IT saves session id as a cookie in frontend, and let us get the data on the backend via the id. 
- It keeps sensitive info from the cookie on the frontend but tell the beackend that the user is logged in and saves the key in BE

#### Requirements for this lesson:
- `passport@~0.4.1`
- `express-session@~1.17.1`

### How do we setup session settings and start passport?

1. import session and passort into file

```js
const session = require('express-session');
const passport = require('passport');
```


2. Setup express app to use session with the following options:

```js
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// SESSION_SECRET will be used to make the hash to encrypt our cookie
```

3. Setup express app to use `passport.initialize()` and `passport.session()`

```js
app.use(passport.intialize())
app.use(passport.session())
```


Personal Questions:

1. When would it be a good idea to use cookies/session based auth? 

2. What are real world context to use it?

3. When shouldn'y you use it?

4. What are better alternatives to it?

5. Give code examples in each case to the above questions...


Resources: 
[express-session](https://www.npmjs.com/package/express-session)
[passport](https://www.npmjs.com/package/passport)