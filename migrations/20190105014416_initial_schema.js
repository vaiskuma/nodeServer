
exports.up = function(knex, Promise) {
    const schema = knex.schema
    .createTable('links', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.string('link');
        table.string('tag');
        table.integer('vote').notNullable();
        
    })
    return schema;
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists('links')
};
