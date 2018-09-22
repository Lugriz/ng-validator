var CommonValidators = (function () {
    function CommonValidators() {
    }
    CommonValidators.requiredTrim = function (control) {
        var val = control.value || '';
        return val.trim() ? null : { requiredTrim: true };
    };
    CommonValidators.greaterThan = function (toCompare, orEquals) {
        if (orEquals === void 0) { orEquals = false; }
        return function (control) {
            var condition = orEquals ? control.value >= toCompare : control.value > toCompare;
            return condition || !control.value ? null : { greaterThan: true };
        };
    };
    CommonValidators.lessThan = function (toCompare, orEquals) {
        if (orEquals === void 0) { orEquals = false; }
        return function (control) {
            var condition = orEquals ? control.value <= toCompare : control.value < toCompare;
            return condition || !control.value ? null : { lessThan: true };
        };
    };
    CommonValidators.equalsTo = function (toCompare, strict) {
        if (strict === void 0) { strict = false; }
        return function (control) {
            var condition = strict ? control.value === toCompare : control.value == toCompare;
            return condition || !control.value ? null : { equalsTo: true };
        };
    };
    CommonValidators.differentTo = function (toCompare, strict) {
        if (strict === void 0) { strict = false; }
        return function (control) {
            var condition = strict ? control.value !== toCompare : control.value != toCompare;
            return condition || !control.value ? null : { differentTo: true };
        };
    };
    CommonValidators.contains = function (seed) {
        return function (control) {
            var val = control.value || '';
            return val.includes(seed) || !val ? null : { contains: true };
        };
    };
    CommonValidators.startsWith = function (seed) {
        return function (control) {
            var val = control.value || '';
            return val.startsWith(seed) || !val ? null : { startsWith: true };
        };
    };
    CommonValidators.endsWith = function (seed) {
        return function (control) {
            var val = control.value || '';
            return val.endsWith(seed) || !val ? null : { endsWith: true };
        };
    };
    CommonValidators.isNumber = function (control) {
        return !isNaN(+control.value) || !control.value ? null : { isNumber: true };
    };
    CommonValidators.isEmail = function (control) {
        var emailRegex = /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return emailRegex.test(control.value) || !control.value ? null : { isEmail: true };
    };
    CommonValidators.isURL = function (control) {
        var urlRegex = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;
        return urlRegex.test(control.value) || !control.value ? null : { isURL: true };
    };
    CommonValidators.isPhone = function (control) {
        var phoneRegex = /^(\+[0-9]{2}\s{1})?(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        return phoneRegex.test(control.value) || !control.value ? null : { isPhone: true };
    };
    return CommonValidators;
}());
export { CommonValidators };
//# sourceMappingURL=CommonValidators.js.map