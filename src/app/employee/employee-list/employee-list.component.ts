import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DELETE_EMPLOYEE, GET_ALL_EMPLOYEES } from '../../graphql/graphql.queries';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],

})
export class EmployeeListComponent implements OnInit {
  empList: any[] = [];

  constructor(private apollo: Apollo, private auth: AuthService) { }

  logout(): void {
    this.auth.clearSessionToken()
  }

  ngOnInit(): void {
    this.fetchEmployees();  
  }

  fetchEmployees(): void {
    this.apollo.query({
      query: GET_ALL_EMPLOYEES
    }).subscribe(({ data, error }: any) => {
      if (error) {
        console.error('Error fetching employees:', error);
        return;
      }

      this.empList = data.getAllEmployees.map((emp: any) => ({
        employee_first_name: emp.first_name,
        employee_last_name: emp.last_name,
        employee_id: emp._id
      }));
    });
  }
  
  deleteEmployee(id: any): void {
    alert(id)
    this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    }).subscribe({
      next: ({ data }: any) => {
        this.empList = this.empList.filter(employee => employee.employee_id !== id);
      }
    });
  }
}
