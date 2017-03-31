# Sequelize + Express spike

Just learning how to get MT to work with [Sequelize](http://docs.sequelizejs.com/en/v3/) and Express.

## tl;dr

Awkward to define fields in migrations AND in the model, seems easy to get out of sync. Query interface is fine and migrations with umzug are good enough.

## Notes

1. Manually add timestamp fields in migration.
2. Manually manage primary keys in migration.
3. Will have to write our own MT migration stuff in umzug (or whatever it's called).
4. Creating a table that already exists is a no-op but also doesn't notify you it didn't do anything. Weird.
5. Associations are a PITA b/c circular references. Had to solve this myself.
6. Keeping table definition and model attributes in sync may be awkward.

## Other Spikes:

+ [Bookshelf.js](https://github.com/localshred/bookshelf-mt-spike)
+ [knex](https://github.com/localshred/knex-mt-spike)
+ [TypeORM](https://github.com/localshred/typeorm-mt-spike)
