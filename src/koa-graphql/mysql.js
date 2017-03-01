import mysql from 'mysql';
import { Schema, setConnection } from '../mysql/schema';

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mysql',
});

setConnection(connection);
connection.connect();

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

// http://localhost:4000/graphql
// {
//   story(author: 1) {
//     text
//     author {
//       id
//       name
//     }
//   }
//
//   user(id: 2) {
//     name
//     stories {
//       text
//     }
//   }
// }
app.listen(4000);
