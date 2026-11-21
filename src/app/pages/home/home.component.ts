import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { I18nService, UiKey } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/products.data';
import { IconComponent } from '../../shared/icon.component';
import { ProductCardComponent } from '../../shared/product-card.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { HeroSliderComponent } from './hero-slider.component';

type BestTab = 'all' | 'treatments' | 'skin-sun' | 'hair-body' | 'dental';

interface DepartmentPill {
  id: string;
  icon: string;
  titleKey: UiKey;
  subKey: UiKey;
  action: 'tab' | 'route' | 'whatsapp';
  tab?: BestTab;
  slug?: string;
  query?: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, IconComponent, ProductCardComponent, RevealDirective, HeroSliderComponent],
  template: `
    <app-hero-slider />

    <!-- Instant Search Bar right under the Hero Image -->
    <section class="home-search-sec">
      <div class="container">
        <div class="home-search-bar">
          <app-icon name="search" class="s-icon" />
          <input
            type="search"
            [placeholder]="i18n.t('searchPlaceholder')"
            [value]="query()"
            (input)="onQuery($event)"
          />
          @if (query()) {
            <button type="button" class="clear-btn" (click)="query.set('')" [attr.aria-label]="i18n.t('clearSearch')">
              <app-icon name="close" />
            </button>
          }
        </div>

        @if (query().trim()) {
          <div class="instant-results">
            <div class="res-head">
              <h3>{{ i18n.t('searchResults') }} ({{ searchResults().length }})</h3>
              <button type="button" class="link-clear" (click)="query.set('')">
                {{ i18n.t('clearSearch') }}
              </button>
            </div>

            @if (searchResults().length === 0) {
              <p class="no-res">{{ i18n.t('noSearchResults') }}</p>
            } @else {
              <div class="product-grid">
                @for (p of searchResults(); track p.id; let i = $index) {
                  <app-product-card [product]="p" [list]="searchResults()" [index]="i" />
                }
              </div>
            }
          </div>
        }
      </div>
    </section>

    <!-- 1. STORE CATEGORIES (التصنيفات: أدوية، عناية، بشرة...) right under the Hero -->
    <section class="section dept-section">
      <div class="container">
        <div class="section-head compact-head" appReveal>
          <span class="eyebrow">
            <app-icon name="medicalCross" />
            CANELLA PHARMACY
          </span>
          <h2>{{ i18n.t('storeDepartments') }}</h2>
          <p>{{ i18n.t('storeDepartmentsSub') }}</p>
        </div>

        <div class="dept-strip" appReveal>
          @for (d of departments; track d.id) {
            @if (d.action === 'whatsapp') {
              <a
                [href]="ps.prescriptionWhatsappUrl()"
                target="_blank"
                rel="noopener"
                class="dept-pill rx-pill"
              >
                <span class="d-icon"><app-icon [name]="d.icon" /></span>
                <div class="d-text">
                  <strong>{{ i18n.t(d.titleKey) }}</strong>
                  <small>{{ i18n.t(d.subKey) }}</small>
                </div>
              </a>
            } @else {
              <button
                type="button"
                class="dept-pill"
                [class.active]="d.tab && bestTab() === d.tab"
                (click)="onDepartmentClick(d)"
              >
                <span class="d-icon"><app-icon [name]="d.icon" /></span>
                <div class="d-text">
                  <strong>{{ i18n.t(d.titleKey) }}</strong>
                  <small>{{ i18n.t(d.subKey) }}</small>
                </div>
              </button>
            }
          }
        </div>
      </div>
    </section>

    <!-- 2. BEST-SELLING PRODUCTS (المنتجات الأكثر مبيعاً) -->
    <section class="section best-sec" id="best-sellers">
      <div class="container">
        <div class="section-head compact-head" appReveal>
          <span class="eyebrow">
            <app-icon name="fire" />
            {{ i18n.t('bestSellerBadge') }}
          </span>
          <h2>{{ i18n.t('bestSellers') }}</h2>
          <p>{{ i18n.t('bestSellersSub') }}</p>
        </div>

        <!-- Quick filter tabs for Best Sellers -->
        <div class="best-tabs" appReveal>
          @for (t of bestTabs; track t.id) {
            <button
              type="button"
              class="tab-btn"
              [class.active]="bestTab() === t.id"
              (click)="bestTab.set(t.id)"
            >
              <app-icon [name]="t.icon" />
              <span>{{ i18n.t(t.label) }}</span>
            </button>
          }
        </div>

        <div class="product-grid">
          @for (p of filteredBestSellers(); track p.id; let i = $index) {
            <app-product-card
              [product]="p"
              [list]="filteredBestSellers()"
              [index]="i"
              [bestSeller]="true"
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

    <!-- Prescription & Medicine Inquiry Strip -->
    <section class="rx-strip-wrap">
      <div class="container">
        <div class="rx-strip" appReveal>
          <div class="rx-icon">
            <app-icon name="pill" />
          </div>
          <div class="rx-copy">
            <h3>{{ i18n.t('rxBannerTitle') }}</h3>
            <p>{{ i18n.t('rxBannerSub') }}</p>
          </div>
          <a [href]="ps.prescriptionWhatsappUrl()" target="_blank" rel="noopener" class="btn btn-gold">
            <app-icon name="whatsapp" />
            <span>{{ i18n.t('rxBannerBtn') }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 3. All 8 Detailed Product Categories -->
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
    .home-search-sec {
      margin-top: -1.8rem;
      position: relative;
      z-index: 15;
    }

    .home-search-bar {
      max-width: 720px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      background: var(--white);
      border: 2px solid var(--purple-100);
      border-radius: 999px;
      padding: 0.45rem 1.25rem;
      box-shadow: var(--shadow-md);
      transition: border-color 0.25s;

      &:focus-within {
        border-color: var(--purple-600);
      }

      .s-icon {
        color: var(--purple-600);
        font-size: 1.3rem;
        margin-inline-end: 0.7rem;
      }

      input {
        flex: 1;
        border: 0;
        background: transparent;
        padding: 0.6rem 0;
        font-family: inherit;
        font-size: 1rem;
        color: var(--ink);
        outline: none;
      }

      .clear-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 0;
        background: var(--purple-50);
        color: var(--purple-800);
        display: grid;
        place-items: center;
      }
    }

    .instant-results {
      margin-top: 1.5rem;
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
      border: 1px solid var(--purple-100);

      .res-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        h3 {
          font-size: 1.15rem;
          color: var(--purple-800);
        }

        .link-clear {
          border: 0;
          background: var(--purple-50);
          color: var(--purple-700);
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.84rem;
        }
      }

      .no-res {
        text-align: center;
        color: var(--muted);
        padding: 1.5rem 0;
        margin: 0;
      }
    }

    /* Department Pills section */
    .dept-section {
      padding-top: 3.25rem;
      padding-bottom: 2.5rem;
    }

    .compact-head {
      margin-bottom: 2rem;
    }

    .dept-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
      gap: 0.9rem;
    }

    .dept-pill {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.65rem;
      padding: 1.2rem 0.9rem;
      border-radius: var(--radius-lg);
      background: var(--white);
      border: 1.5px solid var(--purple-100);
      box-shadow: var(--shadow-sm);
      color: var(--ink);
      transition: transform 0.28s var(--ease), border-color 0.28s, box-shadow 0.28s, background 0.28s;

      .d-icon {
        width: 56px;
        height: 56px;
        border-radius: 18px;
        background: linear-gradient(135deg, var(--purple-50), var(--purple-100));
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 1.65rem;
        transition: transform 0.28s var(--ease), background 0.28s, color 0.28s;
      }

      .d-text {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;

        strong {
          font-size: 0.96rem;
          font-weight: 800;
          color: var(--purple-900);
        }

        small {
          font-size: 0.75rem;
          color: var(--muted);
          line-height: 1.35;
        }
      }

      &:hover,
      &.active {
        transform: translateY(-5px);
        border-color: var(--purple-600);
        box-shadow: var(--shadow-md);

        .d-icon {
          background: linear-gradient(135deg, var(--purple-600), var(--purple-800));
          color: var(--white);
          transform: scale(1.06);
        }
      }

      &.rx-pill {
        background: linear-gradient(135deg, var(--purple-800), var(--purple-700));
        border-color: transparent;
        color: var(--white);

        .d-icon {
          background: rgba(255, 255, 255, 0.16);
          color: var(--gold-300);
        }

        .d-text strong {
          color: var(--white);
        }
        .d-text small {
          color: var(--gold-300);
        }
      }
    }

    /* Best Sellers Section */
    .best-sec {
      padding-top: 3rem;
      background:
        radial-gradient(circle at 10% 10%, rgba(23, 130, 82, 0.08), transparent 40%),
        linear-gradient(180deg, var(--white), var(--purple-50));
    }

    .best-tabs {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.55rem;
      margin-bottom: 2.1rem;
    }

    .tab-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1.2rem;
      border-radius: 999px;
      border: 1.5px solid var(--purple-100);
      background: var(--white);
      color: var(--purple-800);
      font-weight: 700;
      font-size: 0.9rem;
      white-space: nowrap;
      transition: all 0.25s;

      &:hover {
        border-color: var(--purple-600);
      }

      &.active {
        background: linear-gradient(135deg, var(--purple-600), var(--purple-800));
        border-color: transparent;
        color: var(--white);
        box-shadow: 0 8px 20px rgba(23, 130, 82, 0.28);
      }
    }

    /* Prescription Strip */
    .rx-strip-wrap {
      padding: 1rem 0 0;
    }

    .rx-strip {
      display: flex;
      align-items: center;
      gap: 1.35rem;
      padding: 1.65rem 2.2rem;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, var(--purple-900), var(--purple-700));
      color: var(--white);
      box-shadow: var(--shadow-md);

      .rx-icon {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.14);
        color: var(--gold-300);
        display: grid;
        place-items: center;
        font-size: 1.8rem;
        flex-shrink: 0;
      }

      .rx-copy {
        flex: 1;

        h3 {
          font-size: 1.22rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        p {
          margin: 0;
          color: rgba(255, 255, 255, 0.85);
          font-size: 0.94rem;
        }
      }
    }

    .cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }

    .cat-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(23, 130, 82, 0.08);
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
        background: linear-gradient(to top, rgba(22, 43, 36, 0.72), transparent 60%);
      }

      .cat-icon {
        position: absolute;
        top: 0.85rem;
        inset-inline-start: 0.85rem;
        width: 40px;
        height: 40px;
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.94);
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 1.25rem;
        box-shadow: var(--shadow-sm);
      }

      .cat-count {
        position: absolute;
        bottom: 0.75rem;
        inset-inline-end: 0.85rem;
        background: rgba(22, 43, 36, 0.84);
        backdrop-filter: blur(6px);
        color: var(--gold-300);
        font-weight: 700;
        font-size: 0.78rem;
        padding: 0.2rem 0.7rem;
        border-radius: 999px;
      }
    }

    .cat-body {
      padding: 1.15rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      flex: 1;

      h3 {
        font-size: 1.12rem;
        font-weight: 800;
        color: var(--purple-900);
        margin-bottom: 0.25rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 0.84rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .cat-arrow {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--purple-50);
        color: var(--purple-700);
        display: grid;
        place-items: center;
        flex-shrink: 0;
        transition: background 0.25s, color 0.25s;
      }
    }

    .center-cta {
      text-align: center;
      margin-top: 2.25rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 1.75rem 1.35rem;
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(23, 130, 82, 0.08);
      transition: transform 0.3s var(--ease);

      &:hover {
        transform: translateY(-6px);
      }

      .f-icon {
        width: 58px;
        height: 58px;
        margin: 0 auto 1rem;
        border-radius: 18px;
        background: linear-gradient(135deg, var(--purple-100), var(--purple-50));
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 1.7rem;
      }

      h3 {
        font-size: 1.1rem;
        color: var(--purple-900);
        margin-bottom: 0.4rem;
      }

      p {
        margin: 0;
        color: var(--muted);
        font-size: 0.9rem;
      }
    }

    .cta-banner {
      background:
        radial-gradient(circle at 90% 20%, rgba(127, 224, 178, 0.25), transparent 40%),
        linear-gradient(135deg, var(--purple-900), var(--purple-700));
      border-radius: var(--radius-lg);
      padding: 2.5rem 2.75rem;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1.5rem;
      box-shadow: var(--shadow-lg);

      h2 {
        font-size: clamp(1.35rem, 2.8vw, 1.95rem);
        margin-bottom: 0.4rem;
      }

      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.86);
      }

      .cta-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
    }

    @media (max-width: 640px) {
      .home-search-sec {
        margin-top: -1.35rem;
      }
      .home-search-bar {
        padding: 0.3rem 0.95rem;

        input {
          font-size: 0.88rem;
        }
      }
      .instant-results {
        padding: 1rem;
      }

      /* Mobile horizontal scroll or compact 2-row grid for departments */
      .dept-section {
        padding-top: 2rem;
        padding-bottom: 1.5rem;
      }
      .dept-strip {
        display: flex;
        overflow-x: auto;
        gap: 0.65rem;
        padding-bottom: 0.45rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
      .dept-pill {
        min-width: 132px;
        flex-shrink: 0;
        padding: 0.85rem 0.7rem;

        .d-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          font-size: 1.35rem;
        }

        .d-text strong {
          font-size: 0.84rem;
        }
        .d-text small {
          font-size: 0.68rem;
        }
      }

      .best-sec {
        padding-top: 2rem;
      }
      .best-tabs {
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 0.4rem;
        margin-bottom: 1.3rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
      .tab-btn {
        padding: 0.42rem 0.9rem;
        font-size: 0.8rem;
      }

      .rx-strip {
        flex-direction: column;
        text-align: center;
        padding: 1.35rem 1.15rem;
        gap: 0.85rem;

        .btn {
          width: 100%;
          justify-content: center;
        }
      }

      .cat-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
      }
      .cat-img {
        aspect-ratio: 4 / 3;

        .cat-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          font-size: 1rem;
          top: 0.55rem;
          inset-inline-start: 0.55rem;
        }

        .cat-count {
          font-size: 0.7rem;
          padding: 0.15rem 0.55rem;
          bottom: 0.55rem;
          inset-inline-end: 0.55rem;
        }
      }
      .cat-body {
        padding: 0.8rem 0.85rem;

        h3 {
          font-size: 0.95rem;
        }
        p,
        .cat-arrow {
          display: none;
        }
      }
      .features-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
      }
      .feature-card {
        padding: 1.15rem 0.85rem;

        .f-icon {
          width: 46px;
          height: 46px;
          font-size: 1.35rem;
          margin-bottom: 0.65rem;
        }
        h3 {
          font-size: 0.94rem;
        }
        p {
          font-size: 0.78rem;
        }
      }
      .cta-banner {
        padding: 1.65rem 1.2rem;
        text-align: center;
        justify-content: center;

        .cta-btns {
          width: 100%;
          justify-content: center;

          .btn {
            flex: 1;
            justify-content: center;
          }
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  private readonly router = inject(Router);

  readonly query = signal<string>('');
  readonly searchResults = computed(() => this.ps.searchProducts(this.query()));

  readonly bestTab = signal<BestTab>('all');

  readonly departments: DepartmentPill[] = [
    {
      id: 'medicines',
      icon: 'pill',
      titleKey: 'deptMedicines',
      subKey: 'deptMedicinesSub',
      action: 'tab',
      tab: 'treatments',
    },
    {
      id: 'skincare',
      icon: 'jar',
      titleKey: 'deptSkincare',
      subKey: 'deptSkincareSub',
      action: 'route',
      slug: 'skin-creams',
    },
    {
      id: 'suncare',
      icon: 'sun',
      titleKey: 'deptSuncare',
      subKey: 'deptSuncareSub',
      action: 'tab',
      tab: 'skin-sun',
    },
    {
      id: 'haircare',
      icon: 'bottle',
      titleKey: 'deptHaircare',
      subKey: 'deptHaircareSub',
      action: 'route',
      slug: 'shampoo',
    },
    {
      id: 'dental',
      icon: 'tooth',
      titleKey: 'deptDental',
      subKey: 'deptDentalSub',
      action: 'route',
      slug: 'toothpaste',
    },
    {
      id: 'body-foot',
      icon: 'foot',
      titleKey: 'deptBodyFoot',
      subKey: 'deptBodyFootSub',
      action: 'tab',
      tab: 'hair-body',
    },
    {
      id: 'prescription',
      icon: 'whatsapp',
      titleKey: 'deptPrescription',
      subKey: 'deptPrescriptionSub',
      action: 'whatsapp',
    },
  ];

  readonly bestTabs: Array<{ id: BestTab; icon: string; label: UiKey }> = [
    { id: 'all', icon: 'fire', label: 'tabAll' },
    { id: 'treatments', icon: 'pill', label: 'tabTreatments' },
    { id: 'skin-sun', icon: 'sun', label: 'tabSkinSun' },
    { id: 'hair-body', icon: 'bottle', label: 'tabHairBody' },
    { id: 'dental', icon: 'tooth', label: 'tabDental' },
  ];

  readonly filteredBestSellers = computed<Product[]>(() => {
    const tab = this.bestTab();
    const all = this.ps.allProducts;

    switch (tab) {
      case 'treatments':
        // Therapeutic/medical repair items: Eczema cream, Foot crack repair, Sensitive/Veneer toothpaste, Anti-dandruff shampoo, Tea tree face cleanser
        return all.filter((p) =>
          ['sc-1', 'fc-1', 'tp-3', 'tp-5', 'sh-3', 'sh-6', 'fw-1', 'fm-2'].includes(p.id),
        );
      case 'skin-sun':
        return all.filter(
          (p) =>
            p.categorySlug === 'skin-creams' ||
            p.categorySlug === 'face-masks' ||
            p.categorySlug === 'face-wash',
        ).slice(0, 8);
      case 'hair-body':
        return all.filter(
          (p) =>
            p.categorySlug === 'shampoo' ||
            p.categorySlug === 'hair-conditioner' ||
            p.categorySlug === 'body-wash' ||
            p.categorySlug === 'foot-cream',
        );
      case 'dental':
        return all.filter((p) => p.categorySlug === 'toothpaste');
      default:
        return this.ps.featuredProducts;
    }
  });

  readonly features = [
    { icon: 'shield', title: 'f1t', desc: 'f1d' },
    { icon: 'award', title: 'f2t', desc: 'f2d' },
    { icon: 'leaf', title: 'f3t', desc: 'f3d' },
    { icon: 'chat', title: 'f4t', desc: 'f4d' },
  ] as const;

  onQuery(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  onDepartmentClick(d: DepartmentPill): void {
    if (d.action === 'route' && d.slug) {
      this.router.navigate(['/category', d.slug]);
      return;
    }
    if (d.action === 'tab' && d.tab) {
      this.bestTab.set(d.tab);
      if (typeof document !== 'undefined') {
        document.getElementById('best-sellers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
