exports.up = function (knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('cuisine_type');
    table.text('description').defaultTo('');
    table.integer('address_id');
    table.foreign('address_id').references('id').inTable('addresses');
    table.timestamps(true, true);
  });
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('restaurants');
}
