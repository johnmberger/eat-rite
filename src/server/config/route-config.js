(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const newUser = require('../routes/newuser');
    const signIn = require('../routes/signin');
    const restaurants = require('../routes/restaurants');
    const review = require('../routes/review');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/newuser', newUser);
    app.use('/signin', signIn);
    app.use('/restaurants', restaurants);
    app.use('/review', review);
  };

})(module.exports);
