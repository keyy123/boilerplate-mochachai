## Serialization of a User Object

- Goal(s):
    * Use passport to serialize and deserialize objects for auth process
    * Learn serialization and deserialization
    * Learn how to install mongoDB as a dependency
    * Utilize mongodb to link DB and send objects to express server


- De/serialization are vital parts of authentication. 
- Serializing an object = turn its properties and values into a `key` that can be converted back into the original object (deserializating)
 Purpose: Lets us know who is accessing server without sensitive data sent for each request like username and password

GOTCHA:
- Passport will keep a consistent login sessions BUT the user has to be serialized into the session and deserialized when requests are made. 
- Passport only asks us to give it functions/code how we de/serialize the users

Example - de/serialize user - basic
```js
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
```

 ### How serialize and deserialize objects with passport?

 - We make both using passport's `serializeUser` and `deserializeUser` methods:

 ```js
 passport.serializeUser(callback)
 passport.deserializeUser(callback)

 callback for de/serializeUser

 passport.serializeUser((user, done) => {
    done(null, user._id)
 })
// cb = (user, done) => {done(null, user...)}
 // * done == callback for passport de/serialize to signal async work done

passport.deserializeUser((id, done) => {
    myDataBase.findOne({_id: new ObjectID(id)}, (err, doc) => {
        done(null, null); 
    })
})
// (id, done) => { db.method((err, obj) => {done(null, null)})})
// ObjectID class comes from `mongodb` package - `mongodb@~3.6.0`  - make sure to install it and import ObjectID from mongodb package!
 ```

###


1. What are real world context(s) to use serialization/deserialization besides just auth?

2. When shouldn't you use de/serialization?

3. What are better alternatives in weaker use-cases?

4. Give code examples in each case to the above questions...


Resources: 
[express-session](https://www.npmjs.com/package/express-session)
[passport](https://www.npmjs.com/package/passport)