import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { RegisterApiPayload } from '../../../models/register-api-payload.model';
import { RegisterApiResponse } from '../../../models/register-api-response.model';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatError,
  ],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  registrationForm!: FormGroup;
  switchToLogin = output<void>();

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData: RegisterApiPayload = this.registrationForm.value;

      this.authService.register(formData).subscribe({
        next: (res: RegisterApiResponse) => {
          this.switchToLogin.emit();
        },
        error: (err) => {
          this.snackbar.error(`Registration failed: `, err);
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
