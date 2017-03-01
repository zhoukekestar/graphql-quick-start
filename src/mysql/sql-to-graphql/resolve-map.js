

const resolveMap = {
  Story: {
    name: 'Story',
    table: 'story',
    primaryKey: 'id',
    aliases: {},
    referenceMap: {},
    listReferences: {},
  },

  User: {
    name: 'User',
    table: 'user',
    primaryKey: 'id',
    aliases: {},
    referenceMap: {},
    listReferences: {},
  },
};

exports.resolveMap = resolveMap;

exports.registerType = function registerType(type) {
  if (!resolveMap[type.name]) {
    throw new Error(
            `Cannot register type "${type.name}" - resolve map does not exist for that type`,
        );
  }

  resolveMap[type.name].type = type;
};

exports.getType = function getType(type) {
  if (!resolveMap[type] || !resolveMap[type].type) {
    throw new Error(`No type registered for type '${type}'`);
  }

  return resolveMap[type].type;
};
