import { graphql } from 'graphql';
import Schema from './schema';


const query = `
{
  recentPosts(count: 2) {
    _id
  }
}
`;
graphql(Schema, query).then((result) => {
  console.log(JSON.stringify(result, null, 2));
});
