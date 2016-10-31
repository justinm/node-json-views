import _ = require('lodash');

export class Description {

  _allow_all: boolean = false;
  _allowed_keys: string[] = [];
  _disallowed_keys: string[] = [];
  _references: { [key: string]: string } = {};

  allowAll = () => {
    this._allow_all = true;
  };

  allow = (key: string | string[]) => {
    var keys: string[];

    if (!_.isArray(key)) {
      keys = [<string>key];
    } else {
      keys = <string[]>key;
    }

    keys.forEach((key) => {
      this._allowed_keys.push(key);
    });
  };

  deny = (key: string | string[]) => {
    var keys: string[];

    if (!_.isArray(key)) {
      keys = [<string>key];
    } else {
      keys = <string[]>key;
    }

    keys.forEach((key) => {
      this._disallowed_keys.push(key);
    });
  };

  reference = (key: string, name: string) => {
    this._references[key] = name;
  };

}