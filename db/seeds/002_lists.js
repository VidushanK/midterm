
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        {id: 1, name: 'list1'},
        {id: 2, name: 'list2'},
        {id: 3, name: 'list3'}
      ]);
    });
};
