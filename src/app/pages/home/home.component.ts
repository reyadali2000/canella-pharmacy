import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { IconComponent } from '../../shared/icon.component';
import { ProductCardComponent } from '../../shared/product-card.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { HeroSliderComponent } from './hero-slider.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, ProductCardComponent, RevealDirective, HeroSliderComponent],
  template: `
    <app-hero-slider />

    <!-- Categories -->
    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">CANELLA MAX</span>
          <h2>{{ i18n.t('ourCategories') }}</h2>
          <p>{{ i18n.t('ourCategoriesSub') }}</p>
        </div>

        <div class="cat-grid">
          @for (cat of ps.categories; track cat.slug; let i = $index) {
            <a [routerLink]="['/category', cat.slug]" class="cat-card" appReveal [revealDelay]="(i % 4) * 70">
              <div class="cat-img">
                <img [src]="cat.coverImage" [alt]="i18n.tr(cat.name)" loading="lazy" />
                <div class="cat-overlay"></div>
                <span class="cat-icon">
                  <app-icon [name]="cat.icon" />
                </span>
                <span class="cat-count">
                  {{ cat.products.length }}
                  {{ cat.products.length === 1 ? i18n.t('product') : i18n.t('productsCount') }}
                </span>
              </div>

              <div class="cat-body">
                <div>
                  <h3>{{ i18n.tr(cat.name) }}</h3>
                  <p>{{ i18n.tr(cat.description) }}</p>
                </div>
                <span class="cat-arrow">
                  <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
                </span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Featured products -->
    <section class="section featured-sec">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">{{ i18n.t('discover') }}</span>
          <h2>{{ i18n.t('featured') }}</h2>
          <p>{{ i18n.t('featuredSub') }}</p>
        </div>

        <div class="product-grid">
          @for (p of ps.featuredProducts; track p.id; let i = $index) {
            <app-product-card
              [product]="p"
              [list]="ps.featuredProducts"
              [index]="i"
              appReveal
              [revealDelay]="(i % 4) * 65"
            />
          }
        </div>

        <div class="center-cta" appReveal>
          <a routerLink="/products" class="btn btn-primary">
            <span>{{ i18n.t('allProducts') }} ({{ ps.allProducts.length }})</span>
            <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
          </a>
        </div>
      </div>
    </section>

    <!-- Why Canella -->
    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">CANELLA MAX</span>
          <h2>{{ i18n.t('whyUs') }}</h2>
          <p>{{ i18n.t('whyUsSub') }}</p>
        </div>

        <div class="features-grid">
          @for (f of features; track f.icon; let i = $index) {
            <div class="feature-card" appReveal [revealDelay]="i * 80">
              <div class="f-icon">
                <app-icon [name]="f.icon" />
              </div>
              <h3>{{ i18n.t(f.title) }}</h3>
              <p>{{ i18n.t(f.desc) }}</p>
            </div>
          }
        </div>

        <div class="cta-banner" appReveal>
          <div class="cta-copy">
            <h2>{{ i18n.t('ctaTitle') }}</h2>
            <p>{{ i18n.t('ctaText') }}</p>
          </div>
          <div class="cta-btns">
            <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="btn btn-whatsapp">
              <app-icon name="whatsapp" />
              <span>{{ i18n.t('orderWhatsapp') }}</span>
            </a>
            <a [href]="'tel:' + ps.contact.phoneHref" class="btn btn-gold">
              <app-icon name="phone" />
              <span dir="ltr">{{ ps.contact.phone }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 1.65rem;
    }

    .cat-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(123, 47, 168, 0.08);
      display: flex;
      flex-direction: column;
      transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease);

      &:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-md);

        .cat-img img {
          transform: scale(1.08);
        }

        .cat-arrow {
          background: var(--purple-700);
          color: var(--white);
        }
      }
    }

    .cat-img {
      position: relative;
      aspect-ratio: 16 / 11;
      overflow: hidden;
      background: var(--purple-100);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s var(--ease);
      }

      .cat-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(42, 15, 61, 0.72), transparent 60%);
      }

      .cat-icon {
        position: absolute;
        top: 0.9rem;
        inset-inline-start: 0.9rem;
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.92);
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 1.3rem;
        box-shadow: var(--shadow-sm);
      }

      .cat-count {
        position: absolute;
        bottom: 0.85rem;
        inset-inline-end: 0.9rem;
        background: rgba(42, 15, 61, 0.82);
        backdrop-filter: blur(6px);
        color: var(--gold-300);
        font-weight: 700;
        font-size: 0.8rem;
        padding: 0.2rem 0.75rem;
        border-radius: 999px;
      }
    }

    .cat-body {
      padding: 1.25rem 1.35rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.9rem;
      flex: 1;

      h3 {
        font-size: 1.18rem;
        font-weight: 800;
        color: var(--purple-900);
        margin-bottom: 0.3rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 0.86rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .cat-arrow {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--purple-50);
        color: var(--purple-700);
        display: grid;
        place-items: center;
        flex-shrink: 0;
        transition: background 0.25s, color 0.25s;
      }
    }

    .featured-sec {
      background:
        radial-gradient(circle at 10% 10%, rgba(155, 77, 202, 0.08), transparent 40%),
        linear-gradient(180deg, var(--white), var(--purple-50));
    }

    .center-cta {
      text-align: center;
      margin-top: 2.75rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3.5rem;
    }

    .feature-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 2rem 1.5rem;
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(123, 47, 168, 0.08);
      transition: transform 0.3s var(--ease);

      &:hover {
        transform: translateY(-6px);
      }

      .f-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.1rem;
        border-radius: 20px;
        background: linear-gradient(135deg, var(--purple-100), var(--purple-50));
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 1.85rem;
      }

      h3 {
        font-size: 1.15rem;
        color: var(--purple-900);
        margin-bottom: 0.45rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 0.92rem;
      }
    }

    .cta-banner {
      background:
        radial-gradient(circle at 90% 20%, rgba(220, 188, 108, 0.3), transparent 40%),
        linear-gradient(135deg, var(--purple-900), var(--purple-700));
      border-radius: var(--radius-lg);
      padding: 2.75rem 3rem;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
      box-shadow: var(--shadow-lg);

      h2 {
        font-size: clamp(1.4rem, 2.8vw, 2rem);
        margin-bottom: 0.4rem;
      }

      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.84);
      }

      .cta-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
      }
    }

    @media (max-width: 640px) {
      .cta-banner {
        padding: 2rem 1.5rem;
        text-align: center;
        justify-content: center;

        .cta-btns {
          justify-content: center;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);

  readonly features = [
    { icon: 'shield', title: 'f1t', desc: 'f1d' },
    { icon: 'award', title: 'f2t', desc: 'f2d' },
    { icon: 'leaf', title: 'f3t', desc: 'f3d' },
    { icon: 'chat', title: 'f4t', desc: 'f4d' },
  ] as const;
}
