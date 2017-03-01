import {
  graphql,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const schema = require('./schema');
const query = `
{
    story(id:1) {
        id
        text
        author
    }
}
`;

graphql(schema, query).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});
