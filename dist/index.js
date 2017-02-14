"use strict";
const description_1 = require('./lib/description');
const Promise = require('bluebird');
const glob = require('glob');
const _ = require('lodash');
var objectRegistry = {};
function loadPath(path) {
    return new Promise((resolve, reject) => {
        glob(path, function (err, files) {
            files.forEach((file) => {
                try {
                    require(file.substr(0, file.length - 3));
                }
                catch (e) {
                    reject(e);
                }
            });
            resolve();
        });
    });
}
exports.loadPath = loadPath;
function describe(name, block) {
    var description = new description_1.Description();
    block.call(this, description);
    objectRegistry[name] = description;
}
exports.describe = describe;
function view(name, data) {
    if (!objectRegistry[name]) {
        throw new Error('Cannot view object, unknown object: ' + name);
    }
    var data = _.cloneDeep(data);
    var serialized = {};
    var description = objectRegistry[name];
    if (description._allow_all) {
        serialized = data;
    }
    else {
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
        }
        else {
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
exports.view = view;
