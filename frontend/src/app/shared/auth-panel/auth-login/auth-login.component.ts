import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginApiPayload } from '../../../models/login-api-payload.model';
import { LoginApiResponse } from '../../../models/login-api-response.model';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-auth-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  loginForm!: FormGroup;
  switchToRegister = output<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData: LoginApiPayload = this.loginForm.value;

      this.authService.login(formData).subscribe({
        next: (res: LoginApiResponse) => {
          if ('user' in res && 'token' in res) {
            localStorage.setItem('userName', res.user.name);
            localStorage.setItem('authToken', res.token);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userId', res.user.id.toString());
            this.router.navigate(['/dashboard']);
          } else {
            this.snackbar.error('Login failed');
          }
        },
        error: (err) => {
          this.snackbar.error('Error: Login failed');
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
