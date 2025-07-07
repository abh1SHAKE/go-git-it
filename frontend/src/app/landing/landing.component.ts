import { Component } from '@angular/core';
import { LandingAnimationComponent } from "./landing-animation/landing-animation.component";

@Component({
  selector: 'app-landing',
  imports: [LandingAnimationComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
