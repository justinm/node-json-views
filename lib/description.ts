import * as _ from 'lodash';

export interface IAllowOptions {
  as?: string;
}

export interface ITransform {
  (obj: {}): any;
}

export class Description {

  _allow_all: boolean = false;
  _allowed_keys: { key: string; as?: string; }[] = [];
  _disallowed_keys: string[] = [];
  _references: { [key: string]: { descriptionName?: string; as?: string; } } = {};
  _transformations: { as: string; transformer: ITransform }[] = [];

  allowAll = () => {
    this._allow_all = true;
  };

  allow = (key: string | string[], opts?: IAllowOptions) => {
    var keys: { key: string; as?: string; }[];

    if (!_.isArray(key)) {
      keys = [{ key: <string>key, as: opts && opts.as }];
    } else {
      keys = _.map(<string[]>key, (key) => {
        return { key: key, as: opts && opts.as };
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
    this._references[key] = { descriptionName: descriptionName, as: opts && opts.as };
  };

  transform = (arg1: ITransform | string, arg2: ITransform | string | IAllowOptions) => {
    let key: string;
    let transformer: (val: string) => any;

    if (_.isString(arg1) && _.isFunction(arg2)) {
      key = <string>arg1;
      transformer = <ITransform>arg2;
    } else if(_.isFunction(arg1) && _.isObject(arg2)) {
      if (!arg2 || !(<IAllowOptions>arg2).as) {
        throw Error('You must supply an "as" option if a key is not specified');
      }
      key = (<IAllowOptions>arg2).as;
      transformer = <ITransform>arg1;
    }

    this._transformations.push({ transformer: transformer, as: key });

  }

}