import { Component } from '@angular/core';

@Component({
  selector: 'app-details-section',
  imports: [],
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
