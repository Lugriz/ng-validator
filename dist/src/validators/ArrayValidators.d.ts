import { ValidatorFn } from '@angular/forms';
export declare class ArrayValidators {
    static maxLength(max: number): ValidatorFn | any;
    static minLength(min: number): ValidatorFn | any;
    static betweenLength(min: number, max: number): ValidatorFn | any;
    static equalsToSomeElementInGroup(key: string, toCompare: number | string, strict?: boolean): ValidatorFn | any;
    static equalsToSomeElement(toCompare: number | string, strict?: boolean): ValidatorFn | any;
    static keyExistsInElements(key: string): ValidatorFn | any;
}
