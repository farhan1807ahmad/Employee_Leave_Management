import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../model/Employee.model';
import { Employee } from '../../services/employee';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginObj: LoginModel = new LoginModel('', '');

  employeeService = inject(Employee);
  router = inject(Router);

  onLogin() {
    this.employeeService.onLogin(this.loginObj).subscribe({
      next: (result: any) => {
        if(result.result) {
          alert("Login Successful");
          localStorage.setItem('leaveUser', JSON.stringify(result.data));
          this.router.navigateByUrl("/dashboard")
        } else{
          alert("Login Failed");
        }
      },  
      error: (error) => {
        // handle error here
        alert("Login Failed");
      }
    });
    }
}

