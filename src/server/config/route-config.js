(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const restaurants = require('../routes/restaurants');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/restaurants', restaurants);
    app.use('/restaurants/add-restaurant', restaurants);

  };

})(module.exports);
