exports.up = function (knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments();
    table.text('content').notNullable();
    table.integer('rating').notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.integer('restaurant_id').references('id').inTable('restaurants');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reviews');
};
