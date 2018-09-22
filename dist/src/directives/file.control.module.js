import { NgModule } from '@angular/core';
import { FileValueAccessor } from './file-control.directive';
var FileControlModule = (function () {
    function FileControlModule() {
    }
    FileControlModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FileValueAccessor],
                    exports: [FileValueAccessor]
                },] },
    ];
    return FileControlModule;
}());
export { FileControlModule };
//# sourceMappingURL=file.control.module.js.map