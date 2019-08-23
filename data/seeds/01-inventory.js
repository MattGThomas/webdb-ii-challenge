
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventory').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('inventory').insert([
        { VIN: '1C2FGSHJWS4CT56V6', make: 'Chevrolet', model: 'Cruze', mileage: 44934 },
        { VIN: '1LAOCS3DCUNSLEBAD', make: 'Ford', model: 'Edge', mileage: 30128 },
        { VIN: '2W0SDB3XUD5LSMC8F', make: 'Jeep', model: 'Grand Cherokee', mileage: 12934 },
        { VIN: '1J4CDOR8CLSO0VDL8', make: 'Mercedes', model: 'C230', mileage: 24874 }
      ]);
    });
};
