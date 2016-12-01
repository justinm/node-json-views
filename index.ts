import {Description} from './lib/description';
import Promise = require('bluebird');
import glob = require('glob');
import _ = require('lodash');

var objectRegistry: { [name: string]: Description } = {};

export function loadPath(path: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {

    glob(path, function(err: any, files: string[]) {
      files.forEach((file) => {
        try {
          require(file.substr(0, file.length - 3));
        } catch(e) {
          reject(e);
        }
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

export function view(name: string, data: any) {

  if (!objectRegistry[name]) {
    throw new Error('Cannot view object, unknown object: ' + name);
  }

  var data = _.cloneDeep(data);
  var serialized: any = {};
  var description = objectRegistry[name];

  if (description._allow_all) {
    serialized = data;
  } else {
    for (var key of description._allowed_keys) {
      serialized[key.as || key.key] = data[key.key];
    }
  }

  for (var refKey in description._references) {
    if (!description._references.hasOwnProperty(refKey)) {
      return;
    }
    var ref = description._references[refKey];

    if (data[refKey]) {
      serialized[ref.as || refKey] = view(ref.descriptionName, data[refKey]);
    } else {
      delete serialized[refKey];
    }
  }

  description._transformations.forEach((ref) => {
    serialized[ref.as || refKey] = ref.transformer(data);
  });

  if (description._disallowed_keys) {
    for (var disallowedKey of description._disallowed_keys) {
      delete serialized[disallowedKey];
    }
  }

  return serialized;
}