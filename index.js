import {
	graphql,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

const query = '{ hello }';

graphql(schema, query).then(result => {

  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);

});
