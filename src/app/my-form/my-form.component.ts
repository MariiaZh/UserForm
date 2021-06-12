import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AsyncEmailValidator } from './email-async.validator';
import { ValidEmailService } from './async-validator.service';

@Component({
    selector: 'app-my-form',
    templateUrl: './my-form.component.html',
    styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

    registrationForm!: FormGroup;
    firstName!: FormControl;
    lastName!: FormControl;

    dateOfBirth!: FormControl;

    framework!: FormControl;
    frameworkVersion!: FormControl;

    email!: FormControl;
    password!: FormControl;

    constructor(private validEmailService: ValidEmailService) { }

    ngOnInit(): void {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.firstName = new FormControl("", [Validators.required, Validators.minLength(3)]);
        this.lastName = new FormControl("", [Validators.required, Validators.minLength(3)]);
        this.dateOfBirth = new FormControl("", Validators.required);
        this.framework = new FormControl("", Validators.required);
        this.frameworkVersion = new FormControl("", Validators.required);
        this.email = new FormControl("", [Validators.required, Validators.pattern(/[0-9a-z_-]+@[a-z]{2,7}\.[a-z]{2,4}/)], AsyncEmailValidator.createValidator(this.validEmailService));
        this.password = new FormControl("", [Validators.required, Validators.minLength(8)]);
    }

    createForm() {
        this.registrationForm = new FormGroup({
            name: new FormGroup({
                firstName: this.firstName,
                lastName: this.lastName
            }),
            dateOfBirth: this.dateOfBirth,

            technologies: new FormGroup({
                framework: this.framework,
                frameworkVersion: this.frameworkVersion
            }),

            email: this.email,
            password: this.password,

            hobbyArray: new FormArray([new FormGroup({
                hobbyName: new FormControl("", Validators.required),
                hobbyDuration: new FormControl("", Validators.required)
            })
            ])

        })
    }

    onSubmit() {

        if (this.registrationForm.valid) {
            alert("Your form submitted");
            console.log(this.registrationForm.controls)
            this.registrationForm.reset();
        } else {
            alert("Please, validate form for submit!");
        }
    }

    getHobbyControls(elem: string): FormArray {
        return this.registrationForm.controls[elem] as FormArray;
    }


    addHobby() {
        (<FormArray>this.registrationForm.controls["hobbyArray"]).push(new FormGroup({
            hobbyName: new FormControl("", Validators.required),
            hobbyDuration: new FormControl("", Validators.required)
        }));
    }

}

