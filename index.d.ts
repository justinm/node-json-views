import * as Promise from 'bluebird';

declare module "json-views" {

  export function loadPath(path: string): Promise<void>;
  export function describe(name: string, block: Function): void;
  export function view(name: string, data: any): any;

  export interface ITransform {
    (obj: any): any;
  }

  export interface IAllowOptions {
    as?: string;
  }

  export interface Description {
    allowAll: () => void;
    allow: (attribute: string | string[], opts?: IAllowOptions) => void;
    deny: (attribute: string | string[]) => void;
    reference: (attribute: string, descriptorName: string, opts?: IAllowOptions) => void;
    transform: (transformer: string | ITransform, opts: ITransform | IAllowOptions) => any;
  }

}
