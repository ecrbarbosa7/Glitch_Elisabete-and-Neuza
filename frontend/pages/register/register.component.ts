import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  surname = '';
  address = '';
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  register() {
    this.successMessage = '';
    this.errorMessage = '';

   if (this.password.length < 6) {
  this.errorMessage = 'Password must contain at least 6 characters';

  console.error('Register validation error:', {
    field: 'password',
    message: this.errorMessage,
    currentLength: this.password.length
  });

  return;
}

    const data = {
      name: this.name,
      surname: this.surname,
      address: this.address,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
  console.error('Register error:', err);

  this.errorMessage =
    err.error?.message || 'Unable to create account';

  this.successMessage = '';
}
    });
  }
}