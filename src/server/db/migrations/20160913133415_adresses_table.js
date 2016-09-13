exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', (table) => {
    table.increments();
    table.string('line_1').notNullable();
    table.string('line_2').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.boolean('is_admin').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};
