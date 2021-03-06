const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

const Pusher = require('pusher');

const mongoose = require('mongoose');
require('./models/User');
require('./models/Book');
require('./models/Match');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 9000;

mongoose.connect(process.env.ATLAS_CONNECTION, {useNewUrlParser: true} );
let db = mongoose.connection;

// WHATEVESSSS

db.on('error', function () {
  console.log('connection error on mongoose')
});
db.once('open', function() {
    app.listen(PORT, () => {
      console.log('Listening on port ' + PORT);
    });
    console.log('Mongoose connected to MongoDB Atlas');
});

app.use(
  bodyParser.urlencoded(
    { extended: true }
  )
);
app.use(
  bodyParser.json()
);

app.use(require('morgan')('combined'));

const mongoStore = new MongoStore({ mongooseConnection: mongoose.connection });

app.use(
  expressSession(
    {
      secret: 'keyboard cat',
      resave: true,
      store: mongoStore,
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    }
  )  
);

app.use(
  cookieParser()
);

const GR_API_NODE = require('goodreads-api-node');
const GR_CREDENTIALS = {
  key: process.env.GOODREADS_KEY,
  secret: process.env.GOODREADS_SECRET
};
const goodreads = GR_API_NODE(GR_CREDENTIALS);

const passportService = require('./services/passport');
passportService(app);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'eu',
  forceTLS: true
});

require('./routes/authRoutes')(app);
require('./routes/bookRoutes')(app, goodreads);
require('./routes/userRoutes')(app);
require('./routes/shelfRoutes')(app, goodreads);
require('./routes/swipeRoutes')(app, pusher);
require('./routes/matchRoutes')(app, pusher);

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets like our main.js file, main.css file etc
  app.use(express.static('client/build'));

  // Express will serve the index.html file if it does not recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
