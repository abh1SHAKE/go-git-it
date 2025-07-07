import { Component } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { CustomCursorComponent } from "./shared/custom-cursor/custom-cursor.component";

@Component({
  selector: 'app-root',
  imports: [LandingComponent, CustomCursorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
