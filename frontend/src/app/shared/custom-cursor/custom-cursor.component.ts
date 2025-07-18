import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CustomCursorService } from '../../services/custom-cursor.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-custom-cursor',
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss',
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursor', { static: true }) cursorRef!: ElementRef<HTMLDivElement>;

  private mouseX = 0;
  private mouseY = 0;
  private currentX = 0;
  private currentY = 0;
  private animationFrameId = 0;
  private serviceSub!: Subscription;
  private routerSub!: Subscription;

  constructor(
    public cursorService: CustomCursorService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    const cursor = this.cursorRef.nativeElement;

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX - cursor.offsetWidth / 2;
      this.mouseY = e.clientY - cursor.offsetHeight / 2;
    });

    this.animateCursor();

    this.serviceSub = this.cursorService.enabled$.subscribe((enabled) => {
      if (enabled) {
        cursor.style.display = 'block';
      } else {
        cursor.style.display = 'none';
      }
    });

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.setupHoverTargets(cursor), 0);
      });
  }

  private animateCursor(): void {
    const cursor = this.cursorRef.nativeElement;
    this.currentX += (this.mouseX - this.currentX) * 0.22;
    this.currentY += (this.mouseY - this.currentY) * 0.22;
    cursor.style.left = `${this.currentX}px`;
    cursor.style.top = `${this.currentY}px`;

    this.animationFrameId = requestAnimationFrame(() => this.animateCursor());
  }

  private setupHoverTargets(cursor: HTMLElement): void {
    const targets = document.querySelectorAll('.hover-target');

    targets.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        console.log('Hovered on', element);
        cursor.classList.add('cursor-hover');
      });

      element.addEventListener('mouseleave', () => {
        console.log('Unhovered on', element);
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.serviceSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }
}
