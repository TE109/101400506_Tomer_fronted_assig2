import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../graphql/graphql.queries';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-view',
  standalone: false,
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchEmployee(id);
  }

  fetchEmployee(id: any): void {
    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).subscribe({
      next: ({ data }: any) => {
        this.employee = data?.getEmployeeById;
      },
      error: (error) => {
        console.log('Error fetching employee:', error);
      }
    });
  }
}
