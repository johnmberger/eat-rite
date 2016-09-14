exports.up = function (knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('cuisine_type').notNullable();
    table.text('description').notNullable();
    table.integer('address_id');
    table.foreign('address_id').references('id').inTable('addresses');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
