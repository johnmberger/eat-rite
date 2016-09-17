(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const newUser = require('../routes/newUser');
    const signIn = require('../routes/signIn');
    const restaurant = require('../routes/restaurant');
    const restaurants = require('../routes/restaurants');
    const review = require('../routes/review');
    const signOut = require('../routes/signOut');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/newUser', newUser);
    app.use('/signIn', signIn);
    app.use('/restaurant', restaurant);
    app.use('/restaurants', restaurants);
    app.use('/review', review);
    app.use('/signOut', signOut);
  };

})(module.exports);
