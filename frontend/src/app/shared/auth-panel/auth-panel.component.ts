import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [NgClass],
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss'],
})
export class AuthPanelComponent {
  @Output() close = new EventEmitter<void>();
  isClosing = false;

  onClose() {
    this.isClosing = true;

    // Wait for animation to finish before emitting close
    setTimeout(() => {
      this.close.emit();
    }, 600); // should match exit animation duration
  }
}
