

const Boom = require('boom');
const graphql = require('graphql').graphql;
const schema = require('../schema');

module.exports = function graphqlHandler(request, reply) {
  const payload = (request.payload || '').toString();
  graphql(schema, payload).then((result) => {
    if (result.errors) {
      logErrors(result.errors);

      return reply(Boom.badRequest(
                result.errors.reduce(reduceErrors, []),
            ));
    }

    return reply(result);
  });
};

function reduceErrors(errs, err) {
    // Hacky, but knex sucks at errors and graphql swallows errors.
  const isDbErr = err.message.indexOf('Pool') === 0;

  errs.push((isDbErr ? '[Database] ' : '') + err.message);
  return errs;
}

function logErrors(errs) {
  errs.forEach((err) => {
    console.log(err.message);

    if (err.stack) {
      console.log(err.stack);
    }
  });
}
