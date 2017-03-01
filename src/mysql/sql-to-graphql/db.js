

const knex = require('knex');
const config = require('./config/config');
let db;

function getDb() {
  return db || getDb.reconnect();
}

getDb.reconnect = function () {
  db = knex(config);
  return db;
};

module.exports = getDb;
