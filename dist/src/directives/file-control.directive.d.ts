import { ControlValueAccessor } from '@angular/forms';
export declare class FileValueAccessor implements ControlValueAccessor {
    value: any;
    onChange: (_: any) => void;
    onTouched: () => void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
