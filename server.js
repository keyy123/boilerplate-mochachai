'use strict'
const express = require('express');
const app = express();
require('dotenv').config();
// import passport and express session in as variables
const passport = require('passport');
const session = require('express-session');
const { ObjectID } = require('mongodb');
const {myDB, dbName, dbCollection, closeDB} = require('./connection')
const cors = require('cors');
// const runner = require('./test-runner');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('views', './views/pug');
app.set('view engine', 'pug');

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

    process.on('SIGINT', async () => {
        await closeDB(client, server);
    });
}).catch(e => {
    app.get((req, res) => {
        res.render('index', { title: e, message: 'Unable to link to mongo db' })
    });
});

// app.get('/hello', function (req, res) {
//   const name = req.query.name || 'Guest';
//   res.type('txt').send('hello ' + name);
// })

// const travellers = function (req, res) {
//   let data = {};
//   if (req.body && req.body.surname) {
//     switch (req.body.surname.toLowerCase()) {
//       case 'polo':
//         data = {
//           name: 'Marco',
//           surname: 'Polo',
//           dates: '1254 - 1324'
//         };
//         break;
//       case 'colombo':
//         data = {
//           name: 'Cristoforo',
//           surname: 'Colombo',
//           dates: '1451 - 1506'
//         };
//         break;
//       case 'vespucci':
//         data = {
//           name: 'Amerigo',
//           surname: 'Vespucci',
//           dates: '1454 - 1512'
//         };
//         break;
//       case 'da verrazzano':
//       case 'verrazzano':
//         data = {
//           name: 'Giovanni',
//           surname: 'da Verrazzano',
//           dates: '1485 - 1528'
//         };
//         break;
//       default:
//         data = {
//           name: 'unknown'
//         }
//     }
//   }
//   res.json(data);
// };


// app.route('/travellers')
//   .put(travellers);

// let error;
// app.get('/_api/get-tests', cors(), function (req, res, next) {
//   if (error)
//     return res.json({ status: 'unavailable' });
//   next();
// },
//   function (req, res, next) {
//     if (!runner.report) return next();
//     res.json(testFilter(runner.report, req.query.type, req.query.n));
//   },
//   function (req, res) {
//     runner.on('done', function (report) {
//       process.nextTick(() => res.json(testFilter(runner.report, req.query.type, req.query.n)));
//     });
//   });



// app.listen(port, function () {
//   console.log("Listening on port " + port);
//   console.log('Running Tests...');
//   setTimeout(function () {
//     try {
//       runner.run();
//     } catch (e) {
//       error = e;
//       console.log('Tests are not valid:');
//       console.log(error);
//     }
//   }, 1500);
// });


// module.exports = app; // for testing

// function testFilter(tests, type, n) {
//   let out;
//   switch (type) {
//     case 'unit':
//       out = tests.filter(t => t.context.match('Unit Tests'));
//       break;
//     case 'functional':
//       out = tests.filter(t => t.context.match('Functional Tests'));
//       break;
//     default:
//       out = tests;
//   }
//   if (n !== undefined) {
//     return out[n] || out;
//   }
//   return out;
// }
