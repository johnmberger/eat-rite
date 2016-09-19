const databaseName = 'dapdc7h58im0eg';

module.exports = {
  development: {
    client: 'postgresql',
    connection: `postgres://jndwsaairtjett:vilTy6SnyMLVC1kkRkpAbtkc5j@ec2-54-225-81-90.compute-1.amazonaws.com:5432/dapdc7h58im0eg`,
    port: 5432
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'postgresql',
    connection: `postgres://localhost:5432/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  }
};
