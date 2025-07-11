import { Component, OnInit } from '@angular/core';
import { LandingAnimationComponent } from "./landing-animation/landing-animation.component";

@Component({
  selector: 'app-landing',
  imports: [LandingAnimationComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  isAuthenticated: boolean = true;

  heroSectionContent = [
    {
      subheading1: "Copy-pasting code into email drafts? That’s like racing on wet tires in the dry. Go Git It is built for speed, control, and precision — your code deserves a proper pit stop.",
      subheading2: "Store snippets, tag them like sponsors, and retrieve them faster than a DRS overtake. This isn’t a warm-up lap — it’s pole position for your productivity."
    },
    {
      subheading1: "You can keep your snippets scattered like crime scene clues — or catalog them like Dexter’s slides. Go Git It is your clean lab for saving and tagging code, without the mess.",
      subheading2: "Organize every snippet with surgical precision. Private or public — it’s your dark code companion. Justice for chaotic copy-pasting has finally arrived."
    },
    {
      subheading1: "Emailing yourself snippets? That’s a path to the dark side. Go Git It helps you tag, store, and summon your code like a true master of the Force.",
      subheading2: "Forget hunting across galaxies for that one regex. With Go Git It, your snippets live in harmony — like balance restored to the codebase."
    }
  ];

  subheading!: {subheading1: string, subheading2: string}

  ngOnInit(): void {
      this.subheading = this.getSubheading();
  }

  getSubheading(): {subheading1: string, subheading2: string} {
    const content = this.heroSectionContent;
    const randomIndex = Math.floor(Math.random() * content.length);
    return content[randomIndex];
  }
}
