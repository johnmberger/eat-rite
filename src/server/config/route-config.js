(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const restaurantRoute = require('../routes/restaurant');
    const restaurants = require('../routes/restaurants');
    const review = require('../routes/review');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/restaurant', restaurantRoute);
    app.use('/restaurants', restaurants);
    app.use('/restaurants/add-restaurant', restaurants);
    app.use('/review', review);
  };

})(module.exports);
