(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const newUser = require('../routes/newuser');
    const signIn = require('../routes/signin');
    const restaurant = require('../routes/restaurant');
    const restaurants = require('../routes/restaurants');
    const review = require('../routes/review');
    const addRestaurant = require('../routes/add-restaurant');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/newuser', newUser);
    app.use('/signin', signIn);
    app.use('/restaurant', restaurant);
    app.use('/restaurants', restaurants);
    app.use('/review', review);
    app.use('/add-restaurant', addRestaurant)
  };

})(module.exports);
