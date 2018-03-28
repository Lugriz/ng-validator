var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var FileValueAccessor = FileValueAccessor_1 = (function () {
    function FileValueAccessor() {
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    FileValueAccessor.prototype.writeValue = function (value) { };
    FileValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FileValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    return FileValueAccessor;
}());
FileValueAccessor = FileValueAccessor_1 = __decorate([
    Directive({
        selector: "input[type=file]",
        host: {
            "(change)": "onChange($event.target.files)",
            "(blur)": "onTouched()"
        },
        providers: [
            { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor_1, multi: true }
        ]
    })
], FileValueAccessor);
export { FileValueAccessor };
var FileValueAccessor_1;
//# sourceMappingURL=file-control.directive.js.map