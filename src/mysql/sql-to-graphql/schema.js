'use strict';
var getEntityResolver = require('./util/entity-resolver');
var GraphQL = require('graphql');
var StoryType = require('./types/StoryType');
var UserType = require('./types/UserType');
var resolveMap = require('./resolve-map');
var types = require('./types');
var GraphQLObjectType = GraphQL.GraphQLObjectType;
var GraphQLSchema = GraphQL.GraphQLSchema;
var GraphQLNonNull = GraphQL.GraphQLNonNull;
var GraphQLInt = GraphQL.GraphQLInt;
var registerType = resolveMap.registerType;

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',

        fields: function getRootQueryFields() {
            return {
                story: {
                    type: StoryType,

                    args: {
                        id: {
                            name: 'id',
                            type: new GraphQLNonNull(GraphQLInt)
                        }
                    },

                    resolve: getEntityResolver('Story')
                },

                user: {
                    type: UserType,

                    args: {
                        id: {
                            name: 'id',
                            type: new GraphQLNonNull(GraphQLInt)
                        }
                    },

                    resolve: getEntityResolver('User')
                }
            };
        }
    })
});

module.exports = schema;