import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [NgStyle, ScrollRevealDirective],
  templateUrl: './details-section.component.html',
  styleUrl: './details-section.component.scss',
})
export class DetailsSectionComponent implements OnInit, OnDestroy {
  cards = [
    {
      cardTitle: 'Save Smarter',
      cardGradient: `radial-gradient(125% 125% at -2% 101%,
        rgba(245, 87, 2, 1) 10.5%,
        rgba(245, 120, 2, 1) 16%,
        rgba(245, 140, 2, 1) 17.5%,
        rgba(245, 170, 100, 1) 25%,
        rgba(238, 174, 202, 1) 40%,
        rgba(202, 179, 214, 1) 65%,
        rgba(148, 201, 233, 1) 100%)`,
      cardDescription: [
        `Stop dumping code into random files or scattered notes. With Go Git It, every snippet gets its spotlight. Organize your code without the chaos, and make it easier to find that one elusive function you swore you'd remember.`,
        `Your brain’s storage has limits. Go Git It doesn’t. Whether it’s a one-liner regex or a full-on API setup, save it here with clarity. Think of it like bookmarking your brain, but cooler and without the panic attacks.`,
        `Quick saves, auto timestamps, and tag-ready entries mean you can paste now and polish later. Because great ideas don’t wait for neat formatting. Save smarter. Go Git It does the heavy lifting while you code in peace.`,
      ],
    },
    {
      cardTitle: 'Tag Everything',
      cardGradient: `radial-gradient(125% 125% at 101% -2%,
        rgba(245, 87, 2, 1) 10.5%,
        rgba(245, 120, 2, 1) 16%,
        rgba(245, 140, 2, 1) 17.5%,
        rgba(245, 170, 100, 1) 25%,
        rgba(238, 174, 202, 1) 40%,
        rgba(202, 179, 214, 1) 65%,
        rgba(148, 201, 233, 1) 100%)`,
      cardDescription: [
        `Forget scrolling endlessly through generic filenames like "final_final_v2_REAL.js". Add tags like ‘nextjs’, ‘db-magic’, or ‘wtf-was-this’. Instantly locate snippets based on context, not confusion. Tag it. Find it. Love it.`,
        `Tags aren’t just labels—they’re memory boosters for your future self. You may not remember writing that async utility two months from now, but ‘utils’ and ‘networking’ will help jog the right neurons when it matters.`,
        `Your snippets deserve better than ‘misc’. With Go Git It, tagging feels less like admin work and more like giving your code a proper name tag at a party. And yes, we alphabetize like proper code nerds.`,
      ],
    },
    {
      cardTitle: 'Public or Private',
      cardGradient: `radial-gradient(125% 125% at 100% 100%,
        rgba(245, 87, 2, 1) 10.5%,
        rgba(245, 120, 2, 1) 16%,
        rgba(245, 140, 2, 1) 17.5%,
        rgba(245, 170, 100, 1) 25%,
        rgba(238, 174, 202, 1) 40%,
        rgba(202, 179, 214, 1) 65%,
        rgba(148, 201, 233, 1) 100%)`,
      cardDescription: [
        `Not everything is meant to be seen—and that’s okay. With one click, control whether your snippet is a private genius moment or a public flex. Your code, your rules. No judgment, just options.`,
        `Sharing a snippet shouldn’t mean pasting into a chat and hoping formatting survives. Publish cleanly, copy links, and send without fear. Or keep it private until it’s ready for the spotlight. Instant control, zero fuss.`,
        `Switch from private to public like toggling dark mode. Go Git It lets you test, tweak, and then reveal your brilliance when you're ready. Because sometimes, code needs a little alone time before it's shown the world.`,
      ],
    },
  ];

  currentCardIndex = 0;
  progressStates: number[] = [];

  private animationFrameId!: number;
  private isPaused = false;
  private startTime = 0;
  private elapsedBeforePause = 0;
  private duration = 6000;

  ngOnInit(): void {
    this.progressStates = this.cards.map(() => 0);
    this.animateProgress();
  }

  animateProgress(): void {
    this.startTime = performance.now() - this.elapsedBeforePause;

    const animate = (time: number) => {
      if (this.isPaused) return;

      const elapsed = time - this.startTime;
      const progress = Math.min((elapsed / this.duration) * 100, 100);

      this.progressStates[this.currentCardIndex] = progress;

      if (progress < 100) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.progressStates[this.currentCardIndex] = 100;

        const nextIndex = (this.currentCardIndex + 1) % this.cards.length;

        if (nextIndex === 0) {
          this.progressStates = this.cards.map(() => 0);
        }

        this.currentCardIndex = nextIndex;
        this.elapsedBeforePause = 0;
        this.animateProgress();
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  pauseCardLoop(): void {
    if (this.isPaused) return;
    this.isPaused = true;
    cancelAnimationFrame(this.animationFrameId);
    this.elapsedBeforePause = performance.now() - this.startTime;
  }

  resumeCardLoop(): void {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.animateProgress();
  }

  getProgressWidth(index: number): string {
    return `${this.progressStates[index]}%`;
  }

  shouldAnimateProgress(index: number): boolean {
    return index === this.currentCardIndex && !this.isPaused;
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}
