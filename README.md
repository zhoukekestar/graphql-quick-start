# Quick start
* `npm install babel-cli -g` to install babel.
* `npm install` to install dependencies.
* `babel-node index.js` to run script.

# Demos

## hello world
* `cd src`
* `babel-node hello-world.js`
* query:
```
{ hello }
```
* output:
```json
{
  "data": {
    "hello": "world"
  }
}
```

## blog
* This demo is based on [kadirahq/graphql-blog-schema](https://github.com/kadirahq/graphql-blog-schema).
* `cd src/blog`
* `babel-node index.js`
* query
```graphql
{
  recentPosts(count: 2) {
    _id
  }
}
```
* outout
```json
{
  "data": {
    "recentPosts": [
      {
        "_id": "03390abb5570ce03ae524397d215713b"
      },
      {
        "_id": "2f6b59fd0b182dc6e2f0051696c70d70"
      }
    ]
  }
}
```

## koa-graphql
* `cd src/koa-graphql`
* `babel-node hello-world.js` OR `babel-node blog.js`
* Open Chrome & visit `http://localhost:4000/graphql?query={hello}`
* If you disable `graphiql`, you can get data directly through the URL
