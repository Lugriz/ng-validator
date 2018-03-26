import { ValidatorFn, AbstractControl } from '@angular/forms';

// advanced Validators
export class AdvancedValidators {

    private static _listeners: any = {};

    // compare two fields
    public static equalsToField(field: string, keyListener: string = ''): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.parent) return null;

            let parent = control.parent;
            let siblingField = parent.get(field);

            if (!siblingField) throw new Error(`The control ${field} not exists.`);

            this.checkHasListener(control, parent.get( field ), keyListener);

            return control.value == siblingField.value || !control.value ? null : { equalsToField: true };
        }
    }

    // compare two fields
    public static differentToField(field: string, keyListener: string = ''): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.parent) return null;

            let parent = control.parent;
            let siblingField = parent.get(field);

            if (!siblingField) throw new Error(`The control ${field} not exists.`);

            this.checkHasListener(control, parent.get( field ), keyListener);

            return control.value != siblingField.value || !control.value ? null : { differentToField: true };
        }
    }

    // require a field present
    public static requirePresentField(field: string): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.parent) return null;
            const parent = control.parent;

            return parent.get( field ) ? null : { requirePresentField: true };
        }
    }

    // check if the field is valid
    public static requireFieldValid(field: string, keyListener: string = ''): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.parent) return null;
            const parent = control.parent;

            if (!parent.get( field )) throw new Error(`The control ${field} not exists.`);

            this.checkHasListener(control, parent.get( field ), keyListener);

            return parent.get( field ).valid ? null : { requireFieldValid: true };
        }
    }

    // destroy a listener specific
    public static destroyListener(key: string): void {
        if (!this._listeners[ key ]) throw new Error(`It is not exists a listener with the name ${key}`);

        this._listeners[ key ].unsubscribe();
        delete this._listeners[ key ];
    }

    // destroy the _listeners
    public static destroyListeners(): void {

        for (let ls in this._listeners) {
            this._listeners[ ls ].unsubscribe();
        }

        this._listeners = {};
    }

    // list all listeners
    public static listListeners(): any {
        return this._listeners;
    }

    // notify the fields added
    public static notifyTo(fields: string[]): ValidatorFn {
        return (control: AbstractControl) => {
            if (!control.parent) return null;

            const parent = control.parent;

            for (let f of fields) {
                if (!parent.get(f)) throw new Error(`The control ${f} not exists.`);
                parent.get(f).updateValueAndValidity();
            }

            return null;
        }
    }

    // ------------------ PRIVATE METHODS -----------------------

    private static checkHasListener(control: AbstractControl, sibling: AbstractControl, keyListener: string): void {
        // check if not exists the observer with name (keyListener) or the observer is closed
        if ( keyListener.trim() && (!this._listeners[ keyListener ] || this._listeners[ keyListener ].closed) ) {
            // create the listener
            this._listeners[ keyListener ] = sibling.valueChanges.subscribe( val => {
                control.updateValueAndValidity();
            });

        }
    }

}