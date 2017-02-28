import Schema from '../blog/schema';

const Koa = require('koa');
const Router = require('koa-router'); // koa-router@7.x
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql');

const app = new Koa();
const router = new Router();

router.all('/graphql', convert(graphqlHTTP({
  schema: Schema,
  graphiql: true, // Disable it to get data directly
})));

app.use(router.routes()).use(router.allowedMethods());

// http://localhost:4000/graphql?query=%7BrecentPosts(count%3A2)%7B_id%7D%7D
app.listen(4000);
