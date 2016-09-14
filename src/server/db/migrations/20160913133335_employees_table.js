exports.up = function (knex, Promise) {
  return knex.schema.createTable('employees', (table) => {
    table.increments();
    table.string('first_name').defaultsTo('');
    table.string('last_name').defaultsTo('');
    table.string('role').defaultsTo('');
    table.integer('restaurant_id');
    table.foreign('restaurant_id').references('id').inTable('restaurants');
    table.timestamps(true, true);
  });
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('employees');
}
