exports.up = function (knex, Promise) {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('cuisine_type').notNullable();
    table.text('description').defaultTo('');
    table.timestamps(true, true);
  });
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('restaurants');
}
