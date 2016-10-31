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
        this.allow = (key) => {
            var keys;
            if (!_.isArray(key)) {
                keys = [key];
            }
            else {
                keys = key;
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
        this.reference = (key, name) => {
            this._references[key] = name;
        };
    }
}
exports.Description = Description;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZGVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU8sQ0FBQyxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBRTdCO0lBQUE7UUFFRSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFFNUMsYUFBUSxHQUFHO1lBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDO1FBRUYsVUFBSyxHQUFHLENBQUMsR0FBc0I7WUFDN0IsSUFBSSxJQUFjLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxHQUFHLENBQVMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBYSxHQUFHLENBQUM7WUFDdkIsQ0FBQztZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHO2dCQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsU0FBSSxHQUFHLENBQUMsR0FBc0I7WUFDNUIsSUFBSSxJQUFjLENBQUM7WUFFbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxHQUFHLENBQVMsR0FBRyxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksR0FBYSxHQUFHLENBQUM7WUFDdkIsQ0FBQztZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHO2dCQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixjQUFTLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBWTtZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDLENBQUM7SUFFSixDQUFDO0FBQUQsQ0FBQztBQTNDWSxtQkFBVyxjQTJDdkIsQ0FBQSJ9