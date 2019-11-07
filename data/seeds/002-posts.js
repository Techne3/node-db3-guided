
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {contents: 'there is no saying where feet would take you', user_id: 1},
        {contents: 'of course you are, and Iam coming with you', user_id: 2},
        {contents: 'something else here', user_id: 3},
      ]);
    });
};
