exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('lists', (table) => {
      table.increments();
      table.string('name');
    }),
    knex.schema.createTable('contributors', (table) => {
      table.increments();
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.integer('list_id').references('lists.id').onDelete('cascade');
    }),
    knex.schema.createTable('favorites', (table) => {
      table.increments();
      table.integer('user_id').references('users.id').onDelete('cascade');
      table.integer('list_id').references('lists.id').onDelete('cascade');
    }),
    knex.schema.createTable('points', (table) => {
      table.increments();
      table.string('name');
      table.string('lat');
      table.string('long');
      table.integer('list_id').references('lists.id').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE lists CASCADE'),
    knex.schema.dropTable('contributors'),
    knex.schema.dropTable('favorites'),
    knex.schema.dropTable('points')
  ]);
};
