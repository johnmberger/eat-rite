exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments();
    table.string('line_1').notNullable().defaultTo('');
    table.string('line_2');
    table.string('city').notNullable().defaultTo('');
    table.string('state', 2).notNullable().defaultTo('');
    table.string('zip').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};
