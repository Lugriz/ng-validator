import { ValidatorFn } from '@angular/forms';
export declare class AdvancedValidators {
    private static _listeners;
    static equalsToField(field: string, keyListener?: string): ValidatorFn;
    static differentToField(field: string, keyListener?: string): ValidatorFn;
    static requirePresentField(field: string): ValidatorFn;
    static requireFieldValid(field: string, keyListener?: string): ValidatorFn;
    static destroyListener(key: string): void;
    static destroyListeners(): void;
    static listListeners(): any;
    static notifyTo(fields: string[]): ValidatorFn;
    private static checkHasListener(control, sibling, keyListener);
}
