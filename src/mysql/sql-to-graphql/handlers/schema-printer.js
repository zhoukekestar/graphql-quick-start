

const printSchema = require('graphql/utilities/schemaPrinter').printSchema;
const schema = require('../schema');

module.exports = function schemaPrintHandler(request, reply) {
  reply(printSchema(schema));
};
