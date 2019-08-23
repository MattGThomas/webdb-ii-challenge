
exports.up = function(knex) {
  return knex.schema.createTable('inventory', tbl => {
      tbl.increments();
      tbl.string('VIN', 17).unique().notNullable();
      tbl.text('make').notNullable();
      tbl.text('model').notNullable();
      tbl.integer('mileage').notNullable();

      tbl.boolean('title');
      tbl.string('transmission');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory')
};
