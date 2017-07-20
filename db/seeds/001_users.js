exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, username: 'Alice', email:'alice@example.com', password:'123456'}),
        knex('users').insert({id: 2, username: 'Bob', email:'bob@example.com', password:'123456'}),
        knex('users').insert({id: 3, username: 'Charlie', email:'charlie@example.com', password:'123456'})
      ]);
    });
};
