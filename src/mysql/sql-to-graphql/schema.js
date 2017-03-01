
const getEntityResolver = require('./util/entity-resolver');
const GraphQL = require('graphql');
const StoryType = require('./types/StoryType');
const UserType = require('./types/UserType');
const resolveMap = require('./resolve-map');
const types = require('./types');
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLSchema = GraphQL.GraphQLSchema;
const GraphQLNonNull = GraphQL.GraphQLNonNull;
const GraphQLInt = GraphQL.GraphQLInt;
const registerType = resolveMap.registerType;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',

    fields: function getRootQueryFields() {
      return {
        story: {
          type: StoryType,

          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLInt),
            },
          },

          resolve: getEntityResolver('Story'),
        },

        user: {
          type: UserType,

          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLInt),
            },
          },

          resolve: getEntityResolver('User'),
        },
      };
    },
  }),
});

module.exports = schema;
