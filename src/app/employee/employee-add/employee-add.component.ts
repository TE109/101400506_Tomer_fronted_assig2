import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  standalone: false,
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {


  onSumbit():void {
    alert("Pressed")
  }
}
