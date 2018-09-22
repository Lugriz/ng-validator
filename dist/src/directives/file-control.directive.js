import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var FileValueAccessor = (function () {
    function FileValueAccessor() {
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    FileValueAccessor.prototype.writeValue = function (value) { };
    FileValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FileValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    FileValueAccessor.decorators = [
        { type: Directive, args: [{
                    selector: "input[type=file]",
                    host: {
                        "(change)": "onChange($event.target.files)",
                        "(blur)": "onTouched()"
                    },
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true }
                    ]
                },] },
    ];
    return FileValueAccessor;
}());
export { FileValueAccessor };
//# sourceMappingURL=file-control.directive.js.map