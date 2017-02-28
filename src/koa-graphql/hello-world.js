const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql');
const Schema = require('./hello-world-schema');

const app = new Koa();
const router = new Router();

router.all('/graphql', convert(graphqlHTTP({
  schema: Schema,
  graphiql: true,  // Disable it to get data directly
})));

app.use(router.routes()).use(router.allowedMethods());

// http://localhost:4000/graphql?query={hello}
app.listen(4000);
