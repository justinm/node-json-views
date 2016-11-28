import _ = require('lodash');

export interface IAllowOptions {
  as?: string;
}

export class Description {

  _allow_all: boolean = false;
  _allowed_keys: { key: string; opts?: IAllowOptions; }[] = [];
  _disallowed_keys: string[] = [];
  _references: { [key: string]: { descriptionName: string; opts?: IAllowOptions; } } = {};

  allowAll = () => {
    this._allow_all = true;
  };

  allow = (key: string | string[], opts?: IAllowOptions) => {
    var keys: { key: string; opts?: IAllowOptions; }[];

    if (!_.isArray(key)) {
      keys = [{ key: <string>key, opts: opts }];
    } else {
      keys = _.map(<string[]>key, (key) => {
        return { key: key, opts: opts };
      });
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

  reference = (key: string, descriptionName: string, opts?: IAllowOptions) => {
    this._references[key] = { descriptionName: descriptionName, opts: opts };
  };

}