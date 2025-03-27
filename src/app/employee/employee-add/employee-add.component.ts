import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE } from '../../graphql/graphql.queries';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  createForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo 
  ) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      employee_photo: [''],
      department: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.createForm?.valid) {
      const formValues = this.createForm.value;

      this.apollo.mutate({
        mutation: ADD_EMPLOYEE,
        variables: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email,
          gender: formValues.gender,
          designation: formValues.designation,
          salary: formValues.salary,
          date_of_joining: formValues.date_of_joining,
          employee_photo: formValues.employee_photo,
          department: formValues.department
        }
      });
    }
  }
}
