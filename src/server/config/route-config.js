(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const oneRestRoutes = require('../routes/restaurant');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/restaurant', oneRestRoutes);

  };

})(module.exports);
