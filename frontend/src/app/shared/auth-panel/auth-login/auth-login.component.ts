import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginApiPayload } from '../../../models/login-api-payload.model';
import { LoginApiResponse } from '../../../models/logina-api-response.model';

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
      console.log("FORM DATA -> ", formData);

      this.authService.login(formData).subscribe({
        next: (res: LoginApiResponse) => {
          if ('token' in res) {
            console.log("Login successful, token received:", res);
            this.router.navigate(['/dashboard']);
          } else {
            console.error("Login failed, error:", res.error);
          }
        },
        error: (err) => {
          console.error("Login failed:", err);
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
