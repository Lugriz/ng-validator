var FileValidators = (function () {
    function FileValidators() {
    }
    FileValidators.requiredFile = function (control) {
        return control.value && control.value.length ? null : { requiredFile: true };
    };
    FileValidators.allowExtensions = function (extensions) {
        return function (control) {
            var files = control.value || [];
            var isValid = false;
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var f = files_1[_i];
                isValid = false;
                var type = [];
                if (!(f instanceof File))
                    return;
                for (var _a = 0, extensions_1 = extensions; _a < extensions_1.length; _a++) {
                    var ext = extensions_1[_a];
                    type = f.name.split('.');
                    if (type.length < 2)
                        throw new Error('It is not a file type valid.');
                    if (ext === type[type.length - 1]) {
                        isValid = true;
                        break;
                    }
                }
                if (!isValid)
                    return {
                        allowExtensions: {
                            allowedExtensions: extensions.join(', '),
                            invalidFile: {
                                filename: f.name,
                                mimeType: f.type,
                                extension: type[type.length - 1]
                            }
                        }
                    };
            }
            return null;
        };
    };
    FileValidators.minSize = function (min, type) {
        var _this = this;
        if (type === void 0) { type = 'B'; }
        return function (control) {
            var files = control.value || [];
            var typeSize = _this.typeSize[type] || _this.typeSize['B'];
            var size = typeSize * min;
            for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                var f = files_2[_i];
                if (!(f instanceof File))
                    return;
                if (f.size < size)
                    return {
                        minSize: {
                            filename: f.name,
                            minAllow: size,
                            typeDefined: type,
                            fileSizeInBytes: f.size
                        }
                    };
            }
            return null;
        };
    };
    FileValidators.maxSize = function (max, type) {
        var _this = this;
        if (type === void 0) { type = 'B'; }
        return function (control) {
            var files = control.value || [];
            var typeSize = _this.typeSize[type] || _this.typeSize['B'];
            var size = typeSize * max;
            for (var _i = 0, files_3 = files; _i < files_3.length; _i++) {
                var f = files_3[_i];
                if (!(f instanceof File))
                    return null;
                if (f.size > size)
                    return {
                        maxSize: {
                            filename: f.name,
                            maxAllow: size,
                            typeDefined: type,
                            fileSizeInBytes: f.size
                        }
                    };
            }
            return null;
        };
    };
    FileValidators.maxFiles = function (max) {
        return function (control) {
            if (!(control.value instanceof FileList))
                return null;
            var files = control.value || [];
            return files.length > max ? { maxFiles: true } : null;
        };
    };
    FileValidators.minFiles = function (min) {
        return function (control) {
            if (!(control.value instanceof FileList))
                return null;
            var files = control.value || [];
            return files.length < min ? { minFiles: true } : null;
        };
    };
    FileValidators.asyncMinWidthImage = function (min) {
        var _this = this;
        return function (control) {
            return _this.checkWidthImage(control, min, 'min');
        };
    };
    FileValidators.asyncMaxWidthImage = function (max) {
        var _this = this;
        return function (control) {
            return _this.checkWidthImage(control, max);
        };
    };
    FileValidators.asyncMinHeightImage = function (min) {
        var _this = this;
        return function (control) {
            return _this.checkHeightImage(control, min, 'min');
        };
    };
    FileValidators.asyncMaxHeightImage = function (max) {
        var _this = this;
        return function (control) {
            return _this.checkHeightImage(control, max);
        };
    };
    FileValidators.checkWidthImage = function (control, size, compare) {
        if (compare === void 0) { compare = 'max'; }
        var prop = compare + 'WidthImage';
        return new Promise(function (resolve, reject) {
            var files = control.value || [];
            var counterfileVerify = 0;
            var _loop_1 = function (f) {
                if (!(f instanceof File))
                    return { value: null };
                var type = f.type.split('/');
                if (type[0] !== 'image')
                    return { value: resolve((_a = {}, _a[prop] = { errMsg: 'It is not a image.' }, _a)) };
                var img = new Image();
                img.onload = function () {
                    counterfileVerify++;
                    var cond = compare == 'max' ? img.width > size : img.width < size;
                    if (cond)
                        return resolve((_a = {},
                            _a[prop] = (_b = {
                                    filename: f.name
                                },
                                _b[compare + 'WidthAllow'] = size,
                                _b.widthFile = img.width,
                                _b),
                            _a));
                    if (counterfileVerify >= files.length)
                        return resolve(null);
                    var _a, _b;
                };
                img.onerror = function () {
                    return resolve((_a = {}, _a[prop] = { errMsg: 'It can not load the image.' }, _a));
                    var _a;
                };
                img.src = URL.createObjectURL(f);
                var _a;
            };
            for (var _i = 0, files_4 = files; _i < files_4.length; _i++) {
                var f = files_4[_i];
                var state_1 = _loop_1(f);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        });
    };
    FileValidators.checkHeightImage = function (control, size, compare) {
        if (compare === void 0) { compare = 'max'; }
        var prop = compare + 'HeightImage';
        return new Promise(function (resolve, reject) {
            var files = control.value || [];
            var counterfileVerify = 0;
            var _loop_2 = function (f) {
                if (!(f instanceof File))
                    return { value: null };
                var type = f.type.split('/');
                if (type[0] !== 'image')
                    return { value: resolve((_a = {}, _a[prop] = { errMsg: 'It is not a image.' }, _a)) };
                var img = new Image();
                img.onload = function () {
                    counterfileVerify++;
                    var cond = compare == 'max' ? img.height > size : img.height < size;
                    if (cond)
                        return resolve((_a = {},
                            _a[prop] = (_b = {
                                    filename: f.name
                                },
                                _b[compare + 'WidthAllow'] = size,
                                _b.heightFile = img.height,
                                _b),
                            _a));
                    if (counterfileVerify >= files.length)
                        return resolve(null);
                    var _a, _b;
                };
                img.onerror = function () {
                    return resolve((_a = {}, _a[prop] = { errMsg: 'It can not load the image.' }, _a));
                    var _a;
                };
                img.src = URL.createObjectURL(f);
                var _a;
            };
            for (var _i = 0, files_5 = files; _i < files_5.length; _i++) {
                var f = files_5[_i];
                var state_2 = _loop_2(f);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        });
    };
    FileValidators.typeSize = {
        'B': 1,
        'KB': 1024,
        'MB': 1048576,
        'GB': 1073741824,
        'TB': 1099511627776
    };
    return FileValidators;
}());
export { FileValidators };
//# sourceMappingURL=FileValidators.js.map