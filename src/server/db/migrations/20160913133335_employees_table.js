exports.up = function (knex, Promise) {
  return knex.schema.createTable('employees', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('role').notNullable();
    table.integer('restaurant_id');
    table.foreign('restaurant_id').references('id').inTable('restaurants');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('employees');
};
