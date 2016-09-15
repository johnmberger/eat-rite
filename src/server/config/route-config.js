(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const restaurantRoute = require('../routes/restaurant');
    const restaurants = require('../routes/restaurants');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/restaurant', restaurantRoute);
    app.use('/restaurants', restaurants);

  };

})(module.exports);
