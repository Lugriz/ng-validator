import { NgModule } from '@angular/core';
import { FileValueAccessor } from './file-control.directive';

@NgModule({
    declarations: [ FileValueAccessor ],
    exports: [ FileValueAccessor ]
})
export class FileControlModule {}