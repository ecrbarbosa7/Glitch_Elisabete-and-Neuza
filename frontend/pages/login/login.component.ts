import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe(res => {
      console.log(res);
    });
  }
}