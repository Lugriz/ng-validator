import { FormArray } from '@angular/forms';
var ArrayValidators = (function () {
    function ArrayValidators() {
    }
    ArrayValidators.maxLength = function (max) {
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            return control.length > max ? { maxLength: true } : null;
        };
    };
    ArrayValidators.minLength = function (min) {
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            return control.length < min ? { minLength: true } : null;
        };
    };
    ArrayValidators.betweenLength = function (min, max) {
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            return control.length < min || control.length > max ? { betweenLength: true } : null;
        };
    };
    ArrayValidators.equalsToSomeGroupKey = function (key, toCompare, strict) {
        if (strict === void 0) { strict = false; }
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            for (var _i = 0, _a = control.value; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!item[key] && typeof item[key] === 'undefined')
                    return { equalsToSomeGroupKey: true, err: 'Property invalid' };
                var condition = strict ? item[key] === toCompare : item[key] == toCompare;
                if (condition)
                    return null;
            }
            return { equalsToSomeGroupKey: true };
        };
    };
    ArrayValidators.equalsToSomeElement = function (toCompare, strict) {
        if (strict === void 0) { strict = false; }
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            for (var _i = 0, _a = control.value; _i < _a.length; _i++) {
                var item = _a[_i];
                var condition = strict ? item === toCompare : item == toCompare;
                if (condition)
                    return null;
            }
            return { equalsToSomeElement: true };
        };
    };
    ArrayValidators.keyExistsInGroups = function (key) {
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            for (var _i = 0, _a = control.value; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!item[key])
                    return { keyExistsInGroups: true, item: item };
            }
            return null;
        };
    };
    ArrayValidators.keyExistsInAtLeastOneGroup = function (key) {
        return function (control) {
            if (!(control instanceof FormArray))
                return;
            for (var _i = 0, _a = control.value; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item[key])
                    return null;
            }
            return { keyExistsInAtLeastOneGroup: true };
        };
    };
    return ArrayValidators;
}());
export { ArrayValidators };
//# sourceMappingURL=ArrayValidators.js.map