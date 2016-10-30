"use strict";
const _ = require('lodash');
class Description {
    constructor() {
        this._allow_all = false;
        this._allowed_keys = [];
        this._disallowed_keys = [];
        this._references = {};
        this.allowAll = (allow) => {
            this._allow_all = allow;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvZGVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU8sQ0FBQyxXQUFXLFFBQVEsQ0FBQyxDQUFDO0FBRTdCO0lBQUE7UUFFRSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLHFCQUFnQixHQUFhLEVBQUUsQ0FBQztRQUNoQyxnQkFBVyxHQUE4QixFQUFFLENBQUM7UUFFNUMsYUFBUSxHQUFHLENBQUMsS0FBYztZQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUM7UUFFRixVQUFLLEdBQUcsQ0FBQyxHQUFzQjtZQUM3QixJQUFJLElBQWMsQ0FBQztZQUVuQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsQ0FBUyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFhLEdBQUcsQ0FBQztZQUN2QixDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7Z0JBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixTQUFJLEdBQUcsQ0FBQyxHQUFzQjtZQUM1QixJQUFJLElBQWMsQ0FBQztZQUVuQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEdBQUcsQ0FBUyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxHQUFhLEdBQUcsQ0FBQztZQUN2QixDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7Z0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLGNBQVMsR0FBRyxDQUFDLEdBQVcsRUFBRSxJQUFZO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9CLENBQUMsQ0FBQztJQUVKLENBQUM7QUFBRCxDQUFDO0FBM0NZLG1CQUFXLGNBMkN2QixDQUFBIn0=