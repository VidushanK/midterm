exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('name', 'username');
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.renameColumn('username', 'name');
    table.dropColumns('email', 'password');
  });
};
