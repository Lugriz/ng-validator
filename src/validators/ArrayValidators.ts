import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';

// Array Validators
export class ArrayValidators {

    // max length
    public static maxLength(max: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;
            return control.length > max ? { maxLength: true } : null;
        }
    }

    // min length
    public static minLength(min: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;
            return control.length < min ? { minLength: true } : null;
        }
    }

    // between length
    public static betweenLength(min: number, max: number): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;
            return control.length < min || control.length > max ? { betweenLength: true } : null;
        }
    }

    // compare in elements with a value, it need at least one match in a formGroup
    public static equalsToSomeElementInGroup(key: string, toCompare: number | string, strict: boolean = false): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;

            for (let item of control.value) {
                if (!item[ key ] && typeof item[ key ] === 'undefined') return { equalsToSomeElementInGroup: true, err: 'Property invalid' };

                const condition = strict ? item[ key ] === toCompare : item[ key ] == toCompare;

                if (condition) return null;
            }

            return { equalsToSomeElementInGroup: true };
        }
    }

    // compare in elements with a value, it need at least one match in a formControl
    public static equalsToSomeElement(toCompare: number | string, strict: boolean = false): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;

            for (let item of control.value) {
                const condition = strict ? item === toCompare : item == toCompare;

                if (condition) return null;
            }

            return { equalsToSomeElement: true };
        }
    }

    // check if key exists in all elements
    public static keyExistsInElements(key: string): ValidatorFn | any {
        return (control: AbstractControl[]) => {
            if (!(control instanceof FormArray)) return;

            for (let item of control.value) {
                if (!item[ key ]) return { keyExists: true, item };
            }

            return null;
        }
    }

}