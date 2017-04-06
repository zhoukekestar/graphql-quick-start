import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const Authority = new GraphQLObjectType({
  name: 'Authority',
  description: 'Authority',
  fields: {
    authorityName: {
      type: GraphQLString,
      resolve: (parent, args, ctx, info) => {
        console.log(parent, args, ctx, info)
        console.log('authority-name');
        return 'authority-name';
      }
    },
  }
})
const Group = new GraphQLObjectType({
  name: 'Group',
  description: 'Group',
  fields: {
    groupName: {
      type: GraphQLString,
      resolve: () => 'group-name'
    },
    authority: {
      type: Authority,
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      group: {
        type: Group,
        resolve: () => {
          return {
            groupName: 'group-name-2',
            authority: {
              name: 'authority-name-2',
            },
          };
        },
      },
    },
  }),
});

const query = `{
  group {
    groupName
    authority {
      authorityName
    }
  }
}
`;

graphql(schema, query).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});
