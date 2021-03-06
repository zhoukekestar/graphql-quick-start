const GraphQL = require('graphql');
const resolveMap = require('../resolve-map').resolveMap;
const getSelectionSet = require('./get-selection-set');
const getUnaliasedName = require('./get-unaliased-name');
const db = require('../db');
const config = require('../config/config');

function getResolver(type) {
  const typeData = resolveMap[type];

  if (!typeData) {
    throw new Error(`Type "${type}" not a recognized type`);
  }

  const pkAlias = typeData.primaryKey ? typeData.aliases[typeData.primaryKey] : null;
  return function resolveEntity(parent, args, ast) {
    const isList = ast.returnType instanceof GraphQL.GraphQLList;
    const clauses = getClauses(ast, args, typeData.aliases);
    const selection = getSelectionSet(type, ast.fieldASTs[0], typeData.aliases, typeData.referenceMap);
    const hasPkSelected =
      typeData.primaryKey &&
      selection.some(item => item.indexOf(typeData.primaryKey) === 0);

    if (typeData.primaryKey && !hasPkSelected) {
      selection.unshift(getAliasSelection(typeData.primaryKey, pkAlias));
    }

    if (parent) {
      const parentTypeData = resolveMap[ast.parentType.name];
      const refField = parentTypeData.referenceMap[ast.fieldName];
      const listRefField = parentTypeData.listReferences[ast.fieldName];

      if (refField) {
        const unliasedRef = getUnaliasedName(refField, parentTypeData.aliases);
        clauses[typeData.primaryKey] = parent[refField] || parent[unliasedRef];
      } else if (listRefField) {
        const parentPk = parentTypeData.aliases[parentTypeData.primaryKey] || parentTypeData.primaryKey;
        clauses[listRefField] = parent[parentPk];
      }
    }

    const query = (
      isList ? db().select(selection) : db().first(selection)
    ).from(typeData.table).where(clauses).limit(25);

    if (isList) {
      query.limit(args.limit || 25).offset(args.offset || 0);
    }

    if (config.debug) {
      console.log(query.toSQL());
    }

    // @TODO Find a much less hacky and error prone to handle this
    // Ties together with the Node type in Relay!
    return query.then((result) => {
      if (result) {
        result.__type = typeData.type;
      }

      return result;
    });
  };
}

function getClauses(ast, args, aliases) {
  return Object.keys(args).reduce((query, alias) => {
    if (alias === 'limit' || alias === 'offset') {
      return query;
    }

    const field = getUnaliasedName(alias, aliases);
    query[field || alias] = args[alias];
    return query;
  }, {});
}

function getAliasSelection(field, alias) {
  if (alias) {
    return `${field} AS ${alias}`;
  }

  return field;
}

module.exports = getResolver;
