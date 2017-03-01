const getEntityResolver = require('../util/entity-resolver');
const resolveMap = require('../resolve-map');
const GraphQL = require('graphql');
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInt = GraphQL.GraphQLInt;
const GraphQLNonNull = GraphQL.GraphQLNonNull;
const GraphQLString = GraphQL.GraphQLString;
const getType = resolveMap.getType;
const registerType = resolveMap.registerType;

const StoryType = new GraphQLObjectType({
  name: 'Story',
  description: '@TODO DESCRIBE ME',

  fields: function getStoryFields() {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: '@TODO DESCRIBE ME',
      },

      text: {
        type: GraphQLString,
        description: '@TODO DESCRIBE ME',
      },

      author: {
        type: GraphQLInt,
        description: '@TODO DESCRIBE ME',
      },
    };
  },
});

registerType(StoryType);
module.exports = StoryType;
