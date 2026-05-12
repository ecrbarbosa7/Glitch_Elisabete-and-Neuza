import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginInput = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    const data = {
      login: this.loginInput,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (res: any) => {
        this.auth.saveSession(res);
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Invalid login or password';
      }
    });
  }
}