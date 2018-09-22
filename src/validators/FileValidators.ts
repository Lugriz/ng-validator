import { ValidatorFn, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// File Validators
export class FileValidators {

    private static typeSize: any = {
        'B': 1,
        'KB': 1024,
        'MB': 1048576,
        'GB': 1073741824,
        'TB': 1099511627776
    };

    // check file exists
    public static requiredFile(control: AbstractControl): ValidationErrors {
        return control.value && control.value.length ? null : { requiredFile: true };
    }

    // check file list extension allow
    public static allowExtensions(extensions: string[]): ValidatorFn | any {
        return (control: AbstractControl) => {
            const files = control.value || [] as File[];
            let isValid = false;

            // iterate the filelist
            for (let f of  files) {
                isValid = false;
                let type = [];

                // check if the value is a file
                if (!(f instanceof File)) return;

                for (let ext of extensions) {
                    type = f.name.split('.');

                    if (type.length < 2) throw new Error('It is not a file type valid.');

                    if (ext === type[ type.length -1 ]) {
                        isValid = true;
                        break;
                    }
                }

                if (!isValid) return {
                    allowExtensions: {
                        allowedExtensions: extensions.join(', '),
                        invalidFile: {
                            filename: f.name,
                            mimeType: f.type,
                            extension: type[ type.length -1 ]
                        }
                    }
                };
            }

            return null;
        }
    }

    // check the min size file
    public static minSize(min: number, type: string = 'B'): ValidatorFn | any {
        return (control: AbstractControl) => {
            const files = control.value || [] as File[];
            const typeSize = this.typeSize[ type ] || this.typeSize['B'];
            const size = typeSize * min;

            for (let f of files) {
                // check if the value is a file
                if (!(f instanceof File)) return;

                if (f.size < size) return {
                    minSize: {
                        filename: f.name,
                        minAllow: size,
                        typeDefined: type,
                        fileSizeInBytes: f.size
                    }
                };
            }

            return null;
        }
    }

    // check the max size file
    public static maxSize(max: number, type: string = 'B'): ValidatorFn | any {
        return (control: AbstractControl) => {
            const files = control.value || [] as File[];
            const typeSize = this.typeSize[ type ] || this.typeSize['B'];
            const size = typeSize * max;

            for (let f of files) {
                // check if the value is a file
                if (!(f instanceof File)) return null;

                if (f.size > size) return {
                    maxSize: {
                        filename: f.name,
                        maxAllow: size,
                        typeDefined: type,
                        fileSizeInBytes: f.size
                    }
                };
            }

            return null;
        }
    }

    // check the number of files from FileList array, and validate the limit number (max)
    public static maxFiles(max: number): ValidatorFn | any {
        return (control: AbstractControl) => {
            if ( !( control.value instanceof FileList )) return null;
            const files = control.value || [] as File[];
            return files.length > max ? { maxFiles: true } : null;
        }
    }

    // check the number of files from FileList array, and validate the limit number (min)
    public static minFiles(min: number): ValidatorFn | any {
        return (control: AbstractControl) => {
            if ( !( control.value instanceof FileList )) return null;
            const files = control.value || [] as File[];
            return files.length < min ? { minFiles: true } : null;
        }
    }

    // ------------------------- ASYNC METHODS ---------------------------

    // check the width of a image
    public static asyncMinWidthImage(min: number): AsyncValidatorFn | any {
        return (control: AbstractControl) => {
            return this.checkWidthImage(control, min, 'min');
        }
    }

    // check the width of a image
    public static asyncMaxWidthImage(max: number): AsyncValidatorFn | any {
        return (control: AbstractControl) => {
            return this.checkWidthImage(control, max);
        }
    }

    // check the  height of a image
    public static asyncMinHeightImage(min: number): AsyncValidatorFn | any {
        return (control: AbstractControl) => {
            return this.checkHeightImage(control, min, 'min');
        }
    }

    // check the height of a image
    public static asyncMaxHeightImage(max: number): AsyncValidatorFn | any {
        return (control: AbstractControl) => {
            return this.checkHeightImage(control, max);
        }
    }

    // --------------------------- PRIVATE METHODS -----------------------------

    // check the width from a image
    private static checkWidthImage(control: AbstractControl, size: number, compare: string = 'max') {

        let prop = compare + 'WidthImage';

        return new Promise((resolve, reject) => {
            // check instance of control
            const files = control.value || [] as File[];

            // count the files that were resolved
            let counterfileVerify = 0;

            for (let f of files) {

                // check if the value is a file
                if (!(f instanceof File)) return null;

                let type = f.type.split('/');

                // check if it is image
                if (type[0] !== 'image') return resolve({ [ prop ]: { errMsg: 'It is not a image.' } });

                let img = new Image();

                img.onload = () => {
                    counterfileVerify++;

                    let cond = compare == 'max' ? img.width > size : img.width < size;

                    if (cond) return resolve({
                        [ prop ]: {
                            filename: f.name,
                            [ compare + 'WidthAllow' ]: size,
                            widthFile: img.width
                        }
                    });

                    // if it is the last file to check,it return null, it means that all the files passed the constrains
                    if (counterfileVerify >= files.length) return resolve(null);
                };

                img.onerror = () => {
                    return resolve({ [ prop ]: { errMsg: 'It can not load the image.' } });
                };

                img.src = URL.createObjectURL(f);
            }

        });
    }

    // check the width from a image
    private static checkHeightImage(control: AbstractControl, size: number, compare: string = 'max') {

        let prop = compare + 'HeightImage';

        return new Promise((resolve, reject) => {
            // check instance of control
            const files = control.value || [] as File[];

            // count the files that were resolved
            let counterfileVerify = 0;

            for (let f of files) {
                // check if the value is a file
                if (!(f instanceof File)) return null;

                let type = f.type.split('/');

                // check if it is image
                if (type[0] !== 'image') return resolve({ [ prop ]: { errMsg: 'It is not a image.' } });

                let img = new Image();

                img.onload = () => {
                    counterfileVerify++;

                    let cond = compare == 'max' ? img.height > size : img.height < size;

                    if (cond) return resolve({
                        [ prop ]: {
                            filename: f.name,
                            [ compare + 'WidthAllow' ]: size,
                            heightFile: img.height
                        }
                    });

                    // if it is the last file to check,it return null, it means that all the files passed the constrains
                    if (counterfileVerify >= files.length) return resolve(null);
                };

                img.onerror = () => {
                    return resolve({ [ prop ]: { errMsg: 'It can not load the image.' } });
                };

                img.src = URL.createObjectURL(f);
            }

        });
    }
}