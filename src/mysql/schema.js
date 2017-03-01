import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { promisify } from 'bluebird';

let queryAsync;

const Story = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    text: {
      type: GraphQLString,
    },
    author: {
      type: User,
      resolve(parent) {
        // console.log(parent, args);
        return queryAsync(`SELECT * FROM User WHERE id = ${parent.author}`).then(res => res[0]);
      },
    },
  }),
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    stories: {
      type: new GraphQLList(Story),
      resolve(parent) {
        // console.log(parent, args);
        return queryAsync(`SELECT * FROM Story WHERE author = ${parent.id} limit 2`);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({

    // Viewer type
    viewer: {
      type: new GraphQLList(User),
      args: {
        count: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, args) {
        return queryAsync(`SELECT * FROM User limit ${args.count}`);
      },
    },

    // User type
    user: {
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }) {
        return queryAsync(`SELECT * FROM User WHERE id = ${id}`).then(res => res[0]);
        // return db.get(`SELECT * FROM User WHERE id = ${id}`);
      },
    },

    // Story type
    story: {
      type: new GraphQLList(Story),
      args: {
        author: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { author }) {
        return queryAsync(`SELECT * FROM Story WHERE author = ${author} limit 3`);
      },
    },
  }),
});


const Schema = new GraphQLSchema({
  query: Query,
});

const setConnection = (connection) => {
  // const cquery = promisify(connection.query.bind(connection));
  queryAsync = promisify((q, callback) => {
    connection.query(q, (err, results) => {
      callback(err, results);
    });
  });
};

exports.Schema = Schema;
exports.setConnection = setConnection;
