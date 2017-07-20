
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contributors').del()
    .then(function () {
      // Inserts seed entries
      return knex('contributors').insert([
        {id: 1, user_id: 1, list_id: 1},
        {id: 2, user_id: 2, list_id: 2},
        {id: 3, user_id: 3, list_id: 3}
      ]);
    });
};
