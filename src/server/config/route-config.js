(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const newUser = require('../routes/newuser');
    const signIn = require('../routes/signin');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/newuser', newUser);
    app.use('/signin', signIn);
  };

})(module.exports);
