import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticker-card',
  imports: [],
  templateUrl: './ticker-card.component.html',
  styleUrl: './ticker-card.component.scss'
})
export class TickerCardComponent {
  cardTitle = input<string>();
  cardDetails = input<string>();
}
