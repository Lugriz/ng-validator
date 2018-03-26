import { ValidatorFn, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class FileValidators {
    private static typeSize;
    static requiredFile(control: AbstractControl): ValidationErrors;
    static allowExtensions(extensions: string[]): ValidatorFn | any;
    static minSize(min: number, type?: string): ValidatorFn | any;
    static maxSize(max: number, type?: string): ValidatorFn | any;
    static maxFiles(max: number): ValidatorFn | any;
    static minFiles(min: number): ValidatorFn | any;
    static asyncMinWidthImage(min: number): AsyncValidatorFn | any;
    static asyncMaxWidthImage(min: number): AsyncValidatorFn | any;
    static asyncMinHeightImage(min: number): AsyncValidatorFn | any;
    static asyncMaxHeightImage(min: number): AsyncValidatorFn | any;
    private static checkWidthImage(control, size, compare?);
    private static checkHeightImage(control, size, compare?);
}
