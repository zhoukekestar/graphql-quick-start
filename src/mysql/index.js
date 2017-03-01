import { graphql } from 'graphql';
import mysql from 'mysql';
import { Schema, setConnection } from './schema';

// https://github.com/freiksenet/graphql-nodejs-newsfeed

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'mysql',
});

setConnection(connection);
connection.connect();


const query = [
  `
{
  viewer(count: 2) {
    name
  }
}
`,
  `
{
  user(id:1) {
    name
  }
}
`,
  `
{
  story(author:1) {
    text
    author {
      name
    }
  }
}
`,
  `
{
  user(id:2) {
    name,
    stories {
      text
    }
  }
}
`,
];

const graphqlQuery = (i) => {
  if (i === query.length) {
    connection.end();
    return;
  }

  graphql(Schema, query[i]).then((result) => {
    console.log('----------------------------------------');
    console.log(query[i]);
    console.log('------- result ------')
    console.log(JSON.stringify(result, null, 2));
    console.log('----------------------------------------');

    graphqlQuery(i + 1);
  }).catch((e) => {
    console.log(e);
    connection.end();
  });
};

graphqlQuery(0);
