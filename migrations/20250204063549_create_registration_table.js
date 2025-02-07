exports.up = function (knex) {
    return knex.schema.createTable('registrations', (table) => {
      table.increments('id').primary();
      table.string('name').nullable().defaultTo(null);
      table.string('father_name').nullable().defaultTo(null);
      table.string('contact_no').nullable().defaultTo(null);
      table.string('father_contact_no').nullable().defaultTo(null);
      table.string('school_name').nullable().defaultTo(null);
      table.string('dob').nullable().defaultTo(null);
      table.string('school_code').nullable().defaultTo(null);
      table.string('gender').nullable().defaultTo(null);
      table.string('created_at').nullable().defaultTo(null);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('registrations');
  };
  