import { NgClass } from '@angular/common';
import { Component, output } from '@angular/core';
import { AuthRegisterComponent } from "./auth-register/auth-register.component";
import { AuthLoginComponent } from './auth-login/auth-login.component';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [NgClass, AuthRegisterComponent, AuthLoginComponent],
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss'],
})
export class AuthPanelComponent {
  close = output<void>();
  isClosing = false;

  isSignUpPage = true;

  toggleAuth() {
    this.isSignUpPage = !this.isSignUpPage;
  }

  onClose() {
    this.isClosing = true;

    setTimeout(() => {
      this.close.emit();
    }, 600);
  }
}
