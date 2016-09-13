exports.up = function (knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments();
    table.text('content').notNullable();
    table.integer('rating').notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.integer('restaurant_id').references('id').inTable('restaurants');
    table.timestamps(true, true);
  });
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reviews');
}
