import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_EMPLOYEE, LOGIN_USER } from '../../graphql/graphql.queries';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    });
  }

  submitForm(): void {
    if (this.loginForm?.valid) {
      const formValues = this.loginForm.value;
      this.apollo.query({
        query: LOGIN_USER,
        variables: {
          email: formValues.email,
          password: formValues.password
        }
      }).subscribe({
        next: ({ data }: any) => {
          console.log('Sucsefully created employee:', data);
          this.router.navigate(['/emList'])
        },
        error: (error) => {
          console.log('Error fetching employee:', error);
        }
      });
    }
  }

}
