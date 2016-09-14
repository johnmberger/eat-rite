(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const review = require('../routes/review.html')

    // *** register routes *** //
    app.use('/', routes);
    app.use('/review', review)

  };

})(module.exports);
