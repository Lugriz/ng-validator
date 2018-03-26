var AdvancedValidators = (function () {
    function AdvancedValidators() {
    }
    AdvancedValidators.equalsToField = function (field, keyListener) {
        var _this = this;
        if (keyListener === void 0) { keyListener = ''; }
        return function (control) {
            if (!control.parent)
                return null;
            var parent = control.parent;
            var siblingField = parent.get(field);
            if (!siblingField)
                throw new Error("The control " + field + " not exists.");
            _this.checkHasListener(control, parent.get(field), keyListener);
            return control.value == siblingField.value || !control.value ? null : { equalsToField: true };
        };
    };
    AdvancedValidators.differentToField = function (field, keyListener) {
        var _this = this;
        if (keyListener === void 0) { keyListener = ''; }
        return function (control) {
            if (!control.parent)
                return null;
            var parent = control.parent;
            var siblingField = parent.get(field);
            if (!siblingField)
                throw new Error("The control " + field + " not exists.");
            _this.checkHasListener(control, parent.get(field), keyListener);
            return control.value != siblingField.value || !control.value ? null : { differentToField: true };
        };
    };
    AdvancedValidators.requirePresentField = function (field) {
        return function (control) {
            if (!control.parent)
                return null;
            var parent = control.parent;
            return parent.get(field) ? null : { requirePresentField: true };
        };
    };
    AdvancedValidators.requireFieldValid = function (field, keyListener) {
        var _this = this;
        if (keyListener === void 0) { keyListener = ''; }
        return function (control) {
            if (!control.parent)
                return null;
            var parent = control.parent;
            if (!parent.get(field))
                throw new Error("The control " + field + " not exists.");
            _this.checkHasListener(control, parent.get(field), keyListener);
            return parent.get(field).valid ? null : { requireFieldValid: true };
        };
    };
    AdvancedValidators.destroyListener = function (key) {
        if (!this._listeners[key])
            throw new Error("It is not exists a listener with the name " + key);
        this._listeners[key].unsubscribe();
        delete this._listeners[key];
    };
    AdvancedValidators.destroyListeners = function () {
        for (var ls in this._listeners) {
            this._listeners[ls].unsubscribe();
        }
        this._listeners = {};
    };
    AdvancedValidators.listListeners = function () {
        return this._listeners;
    };
    AdvancedValidators.notifyTo = function (fields) {
        return function (control) {
            if (!control.parent)
                return null;
            var parent = control.parent;
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var f = fields_1[_i];
                if (!parent.get(f))
                    throw new Error("The control " + f + " not exists.");
                parent.get(f).updateValueAndValidity();
            }
            return null;
        };
    };
    AdvancedValidators.checkHasListener = function (control, sibling, keyListener) {
        if (keyListener.trim() && (!this._listeners[keyListener] || this._listeners[keyListener].closed)) {
            this._listeners[keyListener] = sibling.valueChanges.subscribe(function (val) {
                control.updateValueAndValidity();
            });
        }
    };
    AdvancedValidators._listeners = {};
    return AdvancedValidators;
}());
export { AdvancedValidators };
//# sourceMappingURL=AdvancedValidators.js.map