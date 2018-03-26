# ng-validator

A set of Angular (>=2) validators with support on input files in reactiveforms, this package is split in commonValidators, ArrayValidators, AdvancedValidators and FileValidators, it has a directive that gives funcionality to inputs files to react to changes as any other inputs.


## Installation

```
    $ npm install ng-validator --save
```

## Usage


### Classes

* [CommonValidators](#CommonValidators)
* [ArrayValidators](#ArrayValidators)
* [AdvancedValidators](#AdvancedValidators)
* [FileValidators](#FileValidators)


### CommonValidators

The class commonValidators contains a few methods to use:


#### requiredTrim
It validates a field to be required, but it making a trim.

```javascript
    // Example

    this.formBuilder.group({
        name: ['', CommonValidators.requiredTrim]
    });
```

#### greaterThan
It validates a field to be greater than `X` number.

```javascript
    // Example

    this.formBuilder.group({
        age: ['', CommonValidators.greaterThan(17)]
    });
```
> **Note:** This validator internally evaluates in this way, `control > 17`, if you want compare `control >= 17`, the method receives a second optional argument of boolean type.

```javascript
    // Example >=

    this.formBuilder.group({
        age: ['', CommonValidators.greaterThan(17, true)]
    });
```

#### lessThan
It validates a field to be less than `X` number.

```javascript
    // Example

    this.formBuilder.group({
        age: ['', CommonValidators.lessThan(17)]
    });
```
> **Note:** This validator internally evaluates in this way, `control < 17`, if you want compare `control <= 17`, the method receives a second optional argument of boolean type.

```javascript
    // Example <=

    this.formBuilder.group({
        age: ['', CommonValidators.lessThan(17, true)]
    });
```

#### equalsTo
It validates a field to be equals to `X` value (string || number).

```javascript
    // Example

    this.formBuilder.group({
        age: ['', CommonValidators.equalsTo(17)]
    });
```
> **Note:** This validator internally evaluates in this way, `control == 17`, if you want compare `control === 17`, the method receives a second optional argument of boolean type.

```javascript
    // Example ===

    this.formBuilder.group({
        age: ['', CommonValidators.equalsTo(17, true)]
    });
```

#### differentTo
It validates a field to be different to `X` value (string || number).

```javascript
    // Example

    this.formBuilder.group({
        age: ['', CommonValidators.differentTo(17)]
    });
```
> **Note:** This validator internally evaluates in this way, `control != 17`, if you want compare `control !== 17`, the method receives a second optional argument of boolean type.

```javascript
    // Example !==

    this.formBuilder.group({
        age: ['', CommonValidators.differentTo(17, true)]
    });
```

#### contains
It validates a field to contains a chunk of `X` value into the string.

```javascript
    // Example

    this.formBuilder.group({
        title: ['', CommonValidators.contains('world')]
    });

    /*
        If the input contains "Hello world", the validator evaluates as correct.
    */
```

#### startsWith
It validates a field to starts with `X` value in the string.

```javascript
    // Example

    this.formBuilder.group({
        title: ['', CommonValidators.startsWith('Hello')]
    });

    /*
        If the input starts with "Hello world", the validator evaluates as correct.
    */
```

#### endsWith
It validates a field to starts with `X` value in the string.

```javascript
    // Example

    this.formBuilder.group({
        title: ['', CommonValidators.endsWith('world')]
    });

    /*
        If the input ends with "Hello world", the validator evaluates as correct.
    */
```

#### isNumber
It validates a field to be a number.

```javascript
    // Example

    this.formBuilder.group({
        age: ['', CommonValidators.isNumber]
    });
```

#### isEmail
It validates a field to be an email.

```javascript
    // Example

    this.formBuilder.group({
        email: ['', CommonValidators.isEmail]
    });
```

#### isURL
It validates a field to be an URL.

```javascript
    // Example

    this.formBuilder.group({
        url: ['', CommonValidators.isURL]
    });
```

#### isPhone
It validates a field to be a phone.

```javascript
    // Example

    this.formBuilder.group({
        phone: ['', CommonValidators.isPhone]
    });
```


### ArrayValidators


#### maxLength
It validates a formArray to have a max length of `X` number.

```javascript
    // Example

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.maxLength(3) )
    });
```

#### minLength
It validates a formArray to have a min length of `X` number.

```javascript
    // Example

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.minLength(3) )
    });
```

#### betweenLength
It validates a formArray to have a min and max length between `X` and `Y` numbers.

```javascript
    // Example

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.betweenLength(1, 3) )
    });
```

#### equalsToSomeElementInGroup
It validates a formArray that least one property into its elements contains the `X` defined value. The method receives three arguments, the property of formGroup (first), the value to compare (second) and de strict mode validation (third).

```javascript
    // Example
    // Each element is a formGroup, but for quick example, It will contains literals objects
    let myArray = [
        {
            a: 1,
            b: 2
        },
        {
            a: 4,
            b: 8
        }
    ];

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.equalsToSomeElementInGroup('a', 4) )
    });

    /*
        be aware:

        - If the property does not exist, you'll receive the following object { "equalsToSomeElementInGroup": true, "err": "Property invalid" }. Make sure the property exists either in the current time or in the future
    */
```

> **Note:** This validator internally evaluates in this way, `control == 17`, if you want compare `control === 17`, the method receives a third optional argument of boolean type.


#### equalsToSomeElement
It validates a formArray that least one property into its elements contains the `X` defined value. The method receives two arguments, the value to compare (first) and the strict mode validation (second).

```javascript
    // Example
    // Each element is a formControl, but for quick example, It will contains literals values
    let myArray = [
        'a',
        'b',
        'c'
    ];

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.equalsToSomeElement('a') )
    });
```

> **Note:** This validator internally evaluates in this way, `control == 17`, if you want compare `control === 17`, the method receives a second optional argument of boolean type.


#### keyExistsInElements
It validates a formArray by checking if contains the key specified in all elements.

```javascript
    // Example
    // Each element is a formGroup, but for quick example, It will contains literals objects
    let myArray = [
        {
            a: 1,
            b: 2
        },
        {
            a: 4,
            b: 8
        }
    ];

    this.formBuilder.group({
        list: this.formBuilder.array( [], ArrayValidators.keyExistsInElements('a') )
    });
```


### AdvancedValidators

This class is one of the most interesting, It allows the interaction with others fields of the form.


#### equalsToField
It compare the value of the current field with other specified field and validates that be equals.
```javascript
    // Example

    this.formBuilder.group({
        password: [ '' ],
        comparePassword: ['', AdvancedValidators.equalsToField('password')]
    });

    /*
        Note: If the specified field doesn't exists, It throws an error
    */
```
##### :ear: Listeners

In this example (above) the *comparePassword* field compares its value with the *password* field, if the values are differents then the validation is triggered.

This validator will only be triggered everytime the field changes (comparePassword), but, what happen when the *password* field changes?, the *comparePassword* field will never meet the new value of the *password* field, It will only meet the value if the *comparePassword* field presents a change.

For example, If the *password* field contains `123` value, then `12` is written as value in the *comparePassword* field, the validator indicates that value isn't the same as the *password* field. Ok, The validator is working, but, what happens if return to the *password* field and a change happens?, and now `123` is written, the *comparePassword* field doesn't listens the new change of the *password* field. Why?. Because the validators are triggered when they detect changes in the fields where they were assigned. No problem, there is a solution for this, `Listeners`.

The most of methods of the `AdvancedValidators` class receives a argument that indicate the name of the listener for that field.

```javascript
    // Example

    this.formBuilder.group({
        password: [ '' ],
        comparePassword: ['', AdvancedValidators.equalsToField('password', 'myListener')]
    });
```

In the example above, it was added a second argument, that argument creates a listener with the name `myListener`, now any change of the *password* field will be notified to the *comparePassword* field and then the validator will be triggered each that the *password* field change.

Internally, a listener is created that is linked to the field indicated as the first argument, in this case the *password* field. It's recommended to name the listener with a descriptive name for the linked field.

Another recommendation is always delete the listeners that you won't use, to free space. To do this, use the `destroyListener` method.

```javascript
    AdvancedValidators.destroyListener('MyListener');
```

If you want destroy all listener, you can use the `destroyListeners` method.

```javascript
    // you could put this methods in the ngDestroy if you want
    ngDestroy() {
        AdvancedValidators.destroyListeners();
    }
```

If you want to watch all the listeners, you can use the `listListeners` method.

```javascript
    AdvancedValidators.listListeners();
```

There is another alternative to notify to other fields. The `notifyTo` method, this method doesn't creates listeners, it only performs an update to all fields subscribed to it. The `notifyTo` method receives a array of fields.

```javascript
    AdvancedValidators.notifyTo(['field1', 'field2', 'field3']);
```

#### differentToField
It compare the value of the current field with other specified field and validates that be different.

```javascript
    // Example

    this.formBuilder.group({
        oldPassword: [ '' ],
        newPassword: ['', AdvancedValidators.differentToField('oldPassword')]
    });

    /*
        Note: If the specified field doesn't exists, It throws an error

        differentToField(field, listener?)
    */
```
> **Note:**  The `differentToField` method can receives a second argument for create a listener.

#### requirePresentField
It validates the presence of a field.

```javascript
    // Example

    this.formBuilder.group({
        currency: ['', AdvancedValidators.requirePresentField('price')]
    });

    /*
        Note: If the specified field doesn't exists, It throws an error

        In this example, the currency field requires the presence of price field
    */
```
> **Note:** The `requirePresentField` method doesn't require a listener, the reason is because when a new field is added to the form, the form is updated, therefore, all fields are updated.

#### requireFieldValid
It validates that the current field will be valid if the specified field is valid.

```javascript
    // Example

    this.formBuilder.group({
        email: [''],
        confirmEmail: ['', AdvancedValidators.requireFieldValid('email')]
    });

    /*
        Note: If the specified field doesn't exists, It throws an error

        In this example, the confirmEmail field is valid if the email field is valid.
    */
```

### FileValidators

This class has methods really useful for files. The problem with *Angular* is that hasn't support for input file, if you want to use a input file with a reactiveforms, you'll notice that the reactiveforms doesn't present any change when you select one file. It seems that reactiveForms doesn't working with input file, this package gives support for it, it contains a directive that you have import on each module where you want to use it.

```javascript
    // you only have to import it and add it to imports array
    import { FileControlModule } from 'ng-validator';

    imports: [ FileControlModule ]
```

Once this is done, the input files will start to working.

Now, you can use the following methods.

#### requiredFile
It validates that the field requires at least one file.

```javascript
    // Example

    this.formBuilder.group({
        photo: [null, FileValidators.requiredFile]
    });
```

#### allowExtensions
It validates that the field allows only the specified extensions.

```javascript
    // Example

    this.formBuilder.group({
        photo: [null, FileValidators.allowExtensions(['png', 'jpeg'])]
    });
```

#### minSize
It validates that the field allows as minimum the specified size.

```javascript
    // Example

    this.formBuilder.group({
        photo: [null, FileValidators.minSize(2, 'MB')]
    });
```
You can specified the type of Bytes you want to use, the following list shows the posibles options, by default the second argement use 'B':

Label | value | description
------|-------|------------
   B  |   1   | 1 Byte
   KB |  1000 | 1000 Bytes
   MG |  1e6  | 1e6 Bytes
   GB |  1e9  | 1e9 Bytes
   TB |  1e12 | 1e12 Bytes


#### maxSize
It validates that the field allows as maximum the specified size.

```javascript
    // Example

    this.formBuilder.group({
        photo: [null, FileValidators.maxSize(2, 'MB')]
    });
```

#### minFiles
It validates that the field allows as minimum a number of files.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, FileValidators.minFiles(2)]
    });
```

#### maxFiles
It validates that the field allows as maximum a number of files.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, FileValidators.maxFiles(5)]
    });
```

#### Async Methods

This class contains asynchonous validators.

#### asyncMinWidthImage
It validates that the width of a image be as minimum to specified value.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, null, FileValidators.asyncMinWidthImage(500)]
    });
```
> **Note:** The asynchonous validators are puts in the thrid position of the formControl

#### asyncMaxWidthImage
It validates that the width of a image be as maximum to specified value.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, null, FileValidators.asyncMaxWidthImage(500)]
    });
```

#### asyncMinHeightImage
It validates that the height of a image be as minimum to specified value.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, null, FileValidators.asyncMinHeightImage(500)]
    });
```

#### asyncMaxHeightImage
It validates that the height of a image be as maximum to specified value.

```javascript
    // Example

    this.formBuilder.group({
        gallery: [null, null, FileValidators.asyncMaxHeightImage(500)]
    });
```

### Issues
```
    https://github.com/Lugriz/ng-validator/issues
```


