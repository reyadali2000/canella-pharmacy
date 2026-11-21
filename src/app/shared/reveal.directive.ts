import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

/** Adds a fade-up animation when the element scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  /** Delay in ms before the animation starts. */
  readonly revealDelay = input<number>(0);

  ngAfterViewInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.style.transitionDelay = `${this.revealDelay()}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('visible');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add('visible');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

