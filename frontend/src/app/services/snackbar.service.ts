import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string, action = 'Close') {
    this.snackBar.open(message, action, {
      panelClass: ['snackbar', 'snackbar-error'],
    });
  }

  success(message: string, action = 'Close') {
    this.snackBar.open(message, action, {
      panelClass: ['snackbar', 'snackbar-success'],
    });
  }

  warn(message: string, action = 'Close') {
    this.snackBar.open(message, action, {
      panelClass: ['snackbar', 'snackbar-warn'],
    });
  }
}
