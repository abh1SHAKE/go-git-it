import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCursorComponent } from "./shared/custom-cursor/custom-cursor.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomCursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
