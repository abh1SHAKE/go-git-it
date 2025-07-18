import { Component } from '@angular/core';
import { TickerSectionComponent } from '../sections/ticker-section/ticker-section.component';
import { FooterSectionComponent } from '../sections/footer-section/footer-section.component';
import { DetailsSectionComponent } from '../sections/details-section/details-section.component';
import { HeroSection } from '../sections/hero-section/hero-section.component';

@Component({
  selector: 'app-landing',
  imports: [
    HeroSection,
    TickerSectionComponent,
    FooterSectionComponent,
    DetailsSectionComponent,
],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
