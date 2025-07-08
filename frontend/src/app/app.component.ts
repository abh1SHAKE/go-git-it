import { Component } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { CustomCursorComponent } from "./shared/custom-cursor/custom-cursor.component";
import { DetailsSectionComponent } from "./sections/details-section/details-section.component";

@Component({
  selector: 'app-root',
  imports: [LandingComponent, CustomCursorComponent, DetailsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
