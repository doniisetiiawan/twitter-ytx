const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');

const routes = require('./server/routes/index');

const app = express();
app.set('port', process.env.PORT || 3000);

const config = require('./server/config/config');

mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', () => {
  console.error(
    'MongoDB Connection Error. Make sure MongoDB is running.',
  );
});

require('./server/config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      url: config.url,
      collection: 'sessions',
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), () => {
  console.log(
    `Express server listening on port ${app.get('port')}`,
  );
});
