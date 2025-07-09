import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-details-section',
  imports: [ScrollRevealDirective],
  templateUrl: './details-section.component.html',
  styleUrl: './details-section.component.scss',
})
export class DetailsSectionComponent {
  cards = [
    {
      cardTitle: 'Save Smarter',
      cardGradient: 'gradient1',
      cardDescription: 'description1',
    },
    {
      cardTitle: 'Tag Everything',
      cardGradient: 'gradient1',
      cardDescription: 'description1',
    },
    {
      cardTitle: 'Public or Private',
      cardGradient: 'gradient1',
      cardDescription: 'description1',
    },
  ];
}
