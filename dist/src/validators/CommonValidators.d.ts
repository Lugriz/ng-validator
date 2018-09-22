import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
export declare class CommonValidators {
    static requiredTrim(control: AbstractControl): ValidationErrors;
    static greaterThan(toCompare: number | string, orEquals?: boolean): ValidatorFn;
    static lessThan(toCompare: number | string, orEquals?: boolean): ValidatorFn;
    static equalsTo(toCompare: number | string, strict?: boolean): ValidatorFn;
    static differentTo(toCompare: number | string, strict?: boolean): ValidatorFn;
    static contains(seed: string): ValidatorFn;
    static startsWith(seed: string): ValidatorFn;
    static endsWith(seed: string): ValidatorFn;
    static isNumber(control: AbstractControl): ValidationErrors;
    static isEmail(control: AbstractControl): ValidationErrors;
    static isURL(control: AbstractControl): ValidationErrors;
    static isPhone(control: AbstractControl): ValidationErrors;
}
