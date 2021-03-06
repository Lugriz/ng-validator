import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Common Validators
export class CommonValidators {

    // field required with trim
    public static requiredTrim(control: AbstractControl): ValidationErrors {
        const val: string = control.value || '';

        return val.trim() ? null : { requiredTrim: true };
    }

    // greater or greaterOrEquals
    public static greaterThan(toCompare: number | string, orEquals: boolean = false): ValidatorFn {
        return (control: AbstractControl) => {
            const condition: boolean = orEquals ? control.value >= toCompare : control.value > toCompare;

            return condition || !control.value ? null : { greaterThan: true };
        }
    }

    // least or leastOrEquals
    public static lessThan(toCompare: number | string, orEquals: boolean = false): ValidatorFn {
        return (control: AbstractControl) => {
            const condition: boolean = orEquals ? control.value <= toCompare : control.value < toCompare;

            return condition || !control.value ? null : { lessThan: true };
        }
    }

    // equals or strict equals
    public static equalsTo(toCompare: number | string, strict: boolean = false): ValidatorFn {
        return (control: AbstractControl) => {
            const condition: boolean = strict ? control.value === toCompare : control.value == toCompare;

            return condition || !control.value ? null : { equalsTo: true };
        }
    }

    // different or strict different
    public static differentTo(toCompare: number | string, strict: boolean = false): ValidatorFn {
        return (control: AbstractControl) => {
            const condition: boolean = strict ? control.value !== toCompare : control.value != toCompare;

            return condition || !control.value ? null : { differentTo: true };
        }
    }

    // contains
    public static contains(seed: string): ValidatorFn {
        return (control: AbstractControl) => {
            const val: string = control.value || '';

            return val.includes( seed ) || !val? null : { contains: true };
        }
    }

    // check if the field start with
    public static startsWith(seed: string): ValidatorFn {
        return (control: AbstractControl) => {
            const val: string = control.value || '';

            return val.startsWith( seed ) || !val ? null : { startsWith: true };
        }
    }

    // check if the field start with
    public static endsWith(seed: string): ValidatorFn {
        return (control: AbstractControl) => {
            const val: string = control.value || '';

            return val.endsWith( seed ) || !val ? null : { endsWith: true };
        }
    }

    // is Number value
    public static isNumber(control: AbstractControl): ValidationErrors {
        return !isNaN(+control.value) || !control.value ? null : { isNumber: true };
    }

    // is email value
    public static isEmail(control: AbstractControl): ValidationErrors {
        const emailRegex: RegExp = /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        return emailRegex.test(control.value) || !control.value ? null : { isEmail: true };
    }

    // is URL value
    public static isURL(control: AbstractControl): ValidationErrors {
        const urlRegex: RegExp = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;
        
        return urlRegex.test(control.value) || !control.value ? null : { isURL: true };
    }

    // is tel value
    public static isPhone(control: AbstractControl): ValidationErrors {
        const phoneRegex: RegExp = /^(\+[0-9]{2}\s{1})?(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

        return phoneRegex.test(control.value) || !control.value ? null : { isPhone: true };
    }
}