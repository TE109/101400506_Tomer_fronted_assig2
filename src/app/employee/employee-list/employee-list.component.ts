import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_EMPLOYEES } from '../../graphql/graphql.queries';
import {RouterOutlet, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],

})
export class EmployeeListComponent implements OnInit {
  empList: any[] = [];

  constructor(private apollo: Apollo) { }

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
}
