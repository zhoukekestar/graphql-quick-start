const getEntityResolver = require('../util/entity-resolver');
const resolveMap = require('../resolve-map');
const GraphQL = require('graphql');
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInt = GraphQL.GraphQLInt;
const GraphQLNonNull = GraphQL.GraphQLNonNull;
const GraphQLString = GraphQL.GraphQLString;
const getType = resolveMap.getType;
const registerType = resolveMap.registerType;

const UserType = new GraphQLObjectType({
  name: 'User',
  description: '@TODO DESCRIBE ME',

  fields: function getUserFields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: '@TODO DESCRIBE ME',
      },

      name: {
        type: GraphQLString,
        description: '@TODO DESCRIBE ME',
      },
    };
  },
});

registerType(UserType);
module.exports = UserType;
