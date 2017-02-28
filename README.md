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
