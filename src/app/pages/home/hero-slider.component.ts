import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { IconComponent } from '../../shared/icon.component';

@Component({
  selector: 'app-hero-slider',
  imports: [RouterLink, IconComponent],
  template: `
    <section
      class="hero"
      (mouseenter)="paused.set(true)"
      (mouseleave)="paused.set(false)"
      (touchstart)="onTouchStart($event)"
      (touchend)="onTouchEnd($event)"
    >
      <div class="bg-glow"></div>

      @for (slide of ps.slides; track slide.id; let i = $index) {
        <div class="slide" [class.active]="i === active()">
          <div class="container slide-grid">
            <div class="copy">
              <span class="badge">
                <app-icon name="sparkle" />
                {{ i18n.tr(slide.badge) }}
              </span>
              <h1>{{ i18n.tr(slide.title) }}</h1>
              <p>{{ i18n.tr(slide.subtitle) }}</p>

              <div class="cta-group">
                <a [routerLink]="['/category', slide.linkSlug ?? 'skin-creams']" class="btn btn-gold">
                  <span>{{ i18n.t('browseProducts') }}</span>
                  <app-icon name="arrow" [class.flip]="i18n.isAr()" />
                </a>
                <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="btn btn-outline">
                  <app-icon name="whatsapp" />
                  <span>{{ i18n.t('orderWhatsapp') }}</span>
                </a>
              </div>
            </div>

            <div class="visual">
              <div class="halo"></div>
              <div class="frame">
                <img [src]="slide.image" [alt]="i18n.tr(slide.title)" />
              </div>
            </div>
          </div>
        </div>
      }

      <div class="controls container">
        <button type="button" class="arrow" (click)="prev()" [attr.aria-label]="i18n.t('prev')">
          <app-icon [name]="i18n.isAr() ? 'chevronRight' : 'chevronLeft'" />
        </button>

        <div class="dots">
          @for (slide of ps.slides; track slide.id; let i = $index) {
            <button
              type="button"
              class="dot"
              [class.active]="i === active()"
              (click)="goTo(i)"
              [attr.aria-label]="'Slide ' + (i + 1)"
            >
              <span class="bar"></span>
            </button>
          }
        </div>

        <button type="button" class="arrow" (click)="next()" [attr.aria-label]="i18n.t('next')">
          <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
        </button>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      min-height: min(760px, 94vh);
      padding: calc(var(--header-h) + 2.5rem) 0 5.5rem;
      background:
        radial-gradient(circle at 18% 22%, rgba(127, 224, 178, 0.22), transparent 38%),
        radial-gradient(circle at 82% 76%, rgba(23, 130, 82, 0.42), transparent 44%),
        linear-gradient(135deg, #10211b 0%, var(--purple-800) 48%, var(--purple-700) 100%);
      color: var(--white);
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    .bg-glow {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: 28px 28px;
      opacity: 0.45;
      pointer-events: none;
    }

    .slide {
      position: absolute;
      inset: calc(var(--header-h) + 1.5rem) 0 4.5rem;
      display: flex;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.85s var(--ease), visibility 0.85s;

      &.active {
        position: relative;
        inset: auto;
        width: 100%;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;

        .copy {
          animation: slideUp 0.85s var(--ease) both;
        }

        .frame img {
          animation: kenBurns 6s ease-out both;
        }
      }
    }

    .slide-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      align-items: center;
      gap: 3rem;
    }

    .copy {
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.4rem 1rem;
        border-radius: 999px;
        background: rgba(23, 130, 82, 0.28);
        border: 1px solid rgba(127, 224, 178, 0.45);
        color: var(--gold-300);
        font-weight: 700;
        font-size: 0.88rem;
        margin-bottom: 1.15rem;
      }

      h1 {
        font-size: clamp(2rem, 4.4vw, 3.35rem);
        font-weight: 900;
        line-height: 1.22;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #ffffff 30%, var(--gold-300) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: clamp(1rem, 1.5vw, 1.18rem);
        color: rgba(255, 255, 255, 0.84);
        max-width: 540px;
        margin: 0 0 2rem;
      }
    }

    .cta-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.9rem;
    }

    .flip {
      transform: scaleX(-1);
    }

    .visual {
      position: relative;
      display: grid;
      place-items: center;

      .halo {
        position: absolute;
        width: 86%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(127, 224, 178, 0.42), rgba(23, 130, 82, 0.12) 68%, transparent);
        filter: blur(22px);
      }

      .frame {
        position: relative;
        width: min(440px, 100%);
        aspect-ratio: 4 / 4.4;
        border-radius: 32px;
        padding: 0.65rem;
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(237, 247, 242, 0.92));
        box-shadow:
          0 28px 65px rgba(0, 0, 0, 0.45),
          0 0 0 1px rgba(127, 224, 178, 0.45);
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 24px;
          background: #ffffff;
        }
      }
    }

    .controls {
      position: absolute;
      bottom: 1.65rem;
      inset-inline: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      z-index: 5;
    }

    .arrow {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.25);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      color: var(--white);
      display: grid;
      place-items: center;
      transition: background 0.2s, transform 0.2s;

      &:hover {
        background: var(--gold-500);
        color: var(--purple-900);
        border-color: transparent;
        transform: scale(1.08);
      }
    }

    .dots {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dot {
      width: 34px;
      height: 6px;
      border-radius: 999px;
      border: 0;
      padding: 0;
      background: rgba(255, 255, 255, 0.25);
      overflow: hidden;
      transition: width 0.3s var(--ease);

      .bar {
        display: block;
        height: 100%;
        width: 0;
        background: var(--gold-400);
      }

      &.active {
        width: 54px;

        .bar {
          width: 100%;
          animation: progress 5s linear;
        }
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(28px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes kenBurns {
      from {
        transform: scale(1.08);
      }
      to {
        transform: scale(1);
      }
    }

    @keyframes progress {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @media (max-width: 900px) {
      .hero {
        min-height: auto;
        padding: calc(var(--header-h) + 1.25rem) 0 4.5rem;
      }
      .slide-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 1.35rem;
      }
      .visual {
        order: -1;
      }
      .visual .frame {
        width: min(260px, 72vw);
        aspect-ratio: 1 / 1.05;
        border-radius: 22px;
        padding: 0.45rem;

        img {
          border-radius: 17px;
        }
      }
      .copy {
        .badge {
          font-size: 0.78rem;
          padding: 0.3rem 0.85rem;
          margin-bottom: 0.75rem;
        }
        h1 {
          font-size: clamp(1.45rem, 6vw, 2rem);
          margin-bottom: 0.6rem;
        }
        p {
          font-size: 0.9rem;
          margin: 0 auto 1.25rem;
        }
      }
      .cta-group {
        justify-content: center;
        gap: 0.6rem;

        .btn {
          padding: 0.65rem 1.15rem;
          font-size: 0.86rem;
        }
      }
      .controls {
        bottom: 1rem;
      }
      .arrow {
        width: 36px;
        height: 36px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSliderComponent implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);

  readonly active = signal(0);
  readonly paused = signal(false);

  private timer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;

  ngOnInit(): void {
    this.timer = setInterval(() => {
      if (!this.paused()) this.next();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next(): void {
    this.active.update((i) => (i + 1) % this.ps.slides.length);
  }

  prev(): void {
    this.active.update((i) => (i - 1 + this.ps.slides.length) % this.ps.slides.length);
  }

  goTo(index: number): void {
    this.active.set(index);
  }

  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.changedTouches[0]?.screenX ?? 0;
  }

  onTouchEnd(e: TouchEvent): void {
    const delta = (e.changedTouches[0]?.screenX ?? 0) - this.touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) {
      this.i18n.isAr() ? this.next() : this.prev();
    } else {
      this.i18n.isAr() ? this.prev() : this.next();
    }
  }
}
