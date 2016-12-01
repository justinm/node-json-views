"use strict";
const _ = require('lodash');
class Description {
    constructor() {
        this._allow_all = false;
        this._allowed_keys = [];
        this._disallowed_keys = [];
        this._references = {};
        this._transformations = [];
        this.allowAll = () => {
            this._allow_all = true;
        };
        this.allow = (key, opts) => {
            var keys;
            if (!_.isArray(key)) {
                keys = [{ key: key, as: opts && opts.as }];
            }
            else {
                keys = _.map(key, (key) => {
                    return { key: key, as: opts && opts.as };
                });
            }
            keys.forEach((key) => {
                this._allowed_keys.push(key);
            });
        };
        this.deny = (key) => {
            var keys;
            if (!_.isArray(key)) {
                keys = [key];
            }
            else {
                keys = key;
            }
            keys.forEach((key) => {
                this._disallowed_keys.push(key);
            });
        };
        this.reference = (key, descriptionName, opts) => {
            this._references[key] = { descriptionName: descriptionName, as: opts && opts.as };
        };
        this.transform = (arg1, arg2) => {
            let key;
            let transformer;
            if (_.isString(arg1) && _.isFunction(arg2)) {
                key = arg1;
                transformer = arg2;
            }
            else if (_.isFunction(arg1) && _.isObject(arg2)) {
                if (!arg2 || !arg2.as) {
                    throw Error('You must supply an "as" option if a key is not specified');
                }
                key = arg2.as;
                transformer = arg1;
            }
            this._transformations.push({ transformer: transformer, as: key });
        };
    }
}
exports.Description = Description;
