"use strict";
const _ = require('lodash');
class Description {
    constructor() {
        this._allow_all = false;
        this._allowed_keys = [];
        this._disallowed_keys = [];
        this._references = {};
        this.allowAll = () => {
            this._allow_all = true;
        };
        this.allow = (key, opts) => {
            var keys;
            if (!_.isArray(key)) {
                keys = [{ key: key, opts: opts }];
            }
            else {
                keys = _.map(key, (key) => {
                    return { key: key, opts: opts };
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
            this._references[key] = { descriptionName: descriptionName, opts: opts };
        };
    }
}
exports.Description = Description;
