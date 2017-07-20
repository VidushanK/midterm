
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(function () {
      // Inserts seed entries
      return knex('points').insert([
        {id: 1, name: 'LightHouse Labs', lat: '49.2819163', long: '-123.1105061', list_id:1},
        {id: 2, name: 'Costco', lat: '49.2785474', long: '-123.1100476', list_id:2},
        {id: 3, name: 'BC Place', lat: '49.2766898', long: '-123.1137028', list_id:3}
      ]);
    });
};
