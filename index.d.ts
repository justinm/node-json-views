declare module "json-serializers" {
  export = JsonSerializers;
}

declare namespace JsonSerializers {

  export function loadPath(path: string): Promise<void>;
  export function describe(name: string, block: Function): void;
  export function serialize(name: string, data: any): any;

  export interface JsonSerializersStatic {
    loadPath(path: string): Promise<void>;
    describe(name: string, block: Function): void;
    serialize(name: string, data: any): any;
  }

  export interface Description {
    allowAll: () => void;
    allow: (attribute: string | string[]) => void;
    deny: (attribute: string | string[]) => void;
    reference: (attribute: string, descriptorName: string) => void;
  }

}
