import {Description} from './lib/description';
import Promise = require('bluebird');
import glob = require('glob');
import _ = require('lodash');

var objectRegistry: { [name: string]: Description } = {};

export function loadPath(path: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {

    glob(path, function(err: any, files: string[]) {
      files.forEach((file) => {
        require(file.substr(0, file.length - 3));
      });
      resolve();
    });

  });
}

export function describe(name: string, block: Function) {
  var description = new Description();

  block.call(description);

  objectRegistry[name] = description;
}

export function serialize(name: string, data: any) {

  if (!objectRegistry[name]) {
    throw new Error('Cannot serialize object, unknown object: ' + name);
  }

  var data = _.cloneDeep(data);
  var serialized: any = {};
  var description = objectRegistry[name];

  if (description._allow_all) {
    serialized = data;
  } else {
    for (var key of description._allowed_keys) {
      serialized[key] = data[key];
    }
  }

  for (var refKey in description._references) {
    if (!description._references.hasOwnProperty(refKey)) {
      return;
    }

    var refName = description._references[refKey];

    if (data[refKey]) {
      serialized[refKey] = serialize(refName, data[refKey]);
    } else {
      delete serialized[refKey];
    }
  }

  if (description._disallowed_keys) {
    for (var key of description._disallowed_keys) {
      delete serialized[key];
    }
  }

  return serialized;
}