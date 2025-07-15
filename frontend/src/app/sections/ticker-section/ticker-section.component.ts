import { Component } from '@angular/core';
import { TickerCardComponent } from './ticker-card/ticker-card.component';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-ticker-section',
  imports: [ScrollRevealDirective, TickerCardComponent],
  templateUrl: './ticker-section.component.html',
  styleUrl: './ticker-section.component.scss',
})
export class TickerSectionComponent {
  tickerCards = [
    {
      cardTitle: 'Did you know?',
      cardDetails:
        'The first computer bug was an actual moth found inside a Harvard Mark II computer in 1947.',
    },
    {
      cardTitle: 'Dev Logic',
      cardDetails:
        '‘It works on my machine’ is not a valid deployment strategy.',
    },
    {
      cardTitle: 'Code Zen',
      cardDetails:
        'Write code as if the next person to maintain it is a violent version of you who knows where you live.',
    },
    {
      cardTitle: 'Terminal Wisdom',
      cardDetails: "`git push --force` is basically the 'YOLO' of programming.",
    },
    {
      cardTitle: 'Go Git It',
      cardDetails:
        'Save it. Tag it. Brag about it. Your snippets deserve better.',
    },
    {
      cardTitle: 'Trivia Time',
      cardDetails:
        'Python is named after Monty Python, not the snake. Mind blown?',
    },
    {
      cardTitle: 'Best Practice',
      cardDetails:
        'Comment your code like the reader is you in 6 months — sleep-deprived and confused.',
    },
    {
      cardTitle: 'Real Talk',
      cardDetails:
        'Stack Overflow is your true coding partner. You just won’t admit it publicly.',
    },
    {
      cardTitle: 'Pro Tip',
      cardDetails:
        'Save that regex before it disappears into the abyss of memory. Use Go Git It.',
    },
    {
      cardTitle: 'Fact Drop',
      cardDetails:
        'JavaScript was created in just 10 days. And we’re still debugging it 28 years later.',
    },
    {
      cardTitle: 'Dev Horoscope',
      cardDetails:
        'Your next bug will vanish the moment you open a support ticket. Universe rules.',
    },
    {
      cardTitle: 'Confession Booth',
      cardDetails:
        "Yes, we’ve all used `console.log('here')` as a debugging strategy.",
    },
    {
      cardTitle: 'Snippet Vibes',
      cardDetails: 'A saved snippet today is a panic-free deployment tomorrow.',
    },
    {
      cardTitle: 'Code Haiku',
      cardDetails:
        'Semicolon lost / Compiler weeps silently / Night debugging starts',
    },
    {
      cardTitle: 'Just Dev Things',
      cardDetails:
        'Rename a variable and VS Code fans start spinning like jet engines.',
    },
    {
      cardTitle: 'True Story',
      cardDetails:
        '80% of a developer’s time is spent naming variables. The rest is renaming them.',
    },
    {
      cardTitle: 'Keyboard Kung Fu ',
      cardDetails: 'Ctrl + Z is the most used form of time travel.',
    },
    {
      cardTitle: 'Chronicles of Git',
      cardDetails:
        'You haven’t lived until you’ve run `git reflog` to rescue a commit you nuked.',
    },
    {
      cardTitle: 'Night Owl Mode',
      cardDetails:
        'You write your best code between 2–3am and forget what it does by 10am.',
    },
    {
      cardTitle: 'Why Go Git It?',
      cardDetails: 'Because sticky notes aren’t version control.',
    },
    {
      cardTitle: 'Punchline',
      cardDetails:
        'I told my code a joke. Now it won’t stop throwing exceptions.',
    },
    {
      cardTitle: 'Weekend Plans',
      cardDetails:
        'Update dependencies → Break everything → Cry → Fix one → Break two',
    },
    {
      cardTitle: 'Micro Myth',
      cardDetails:
        'Tabs vs Spaces is still more heated than pineapple on pizza.',
    },
    {
      cardTitle: 'Coder Law #42',
      cardDetails:
        'If you fix one bug, you create two new ones. It’s basically mitosis.',
    },
    {
      cardTitle: 'Legend Has It',
      cardDetails: 'Some developers write bug-free code. We call them myths.',
    },
    {
      cardTitle: 'Terminal Lore',
      cardDetails: 'Every `cd ..` is a little journey back to sanity.',
    },
    {
      cardTitle: 'Bit of History',
      cardDetails:
        'The ‘Hello, World!’ program first appeared in a 1978 book by Brian Kernighan.',
    },
    {
      cardTitle: 'Go Git Wisdom',
      cardDetails:
        'Not saving your code is like writing poetry on a whiteboard during a rainstorm.',
    },
    {
      cardTitle: 'Just Saying',
      cardDetails:
        'You never truly know fear until you `rm -rf` the wrong directory.',
    },
    {
      cardTitle: 'Code Confession',
      cardDetails:
        '‘Quick fix’ is a developer’s way of saying ‘you’ll regret this in 3 months.’',
    },
  ];
}
