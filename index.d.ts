declare module "json-views" {
  export = JsonViews;
}

declare namespace JsonViews {

  export function loadPath(path: string): Promise<void>;
  export function describe(name: string, block: Function): void;
  export function view(name: string, data: any): any;

  export interface JsonViewsStatic {
    loadPath(path: string): Promise<void>;
    describe(name: string, block: Function): void;
    view(name: string, data: any): any;
  }

  export interface Description {
    allowAll: () => void;
    allow: (attribute: string | string[]) => void;
    deny: (attribute: string | string[]) => void;
    reference: (attribute: string, descriptorName: string) => void;
  }

}
