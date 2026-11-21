import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../core/cart.service';
import { I18nService } from '../core/i18n.service';
import { ProductService } from '../core/product.service';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  template: `
    <header class="site-header" [class.scrolled]="scrolled()">
      <div class="container header-inner">
        <a routerLink="/" class="brand" (click)="closeMenu()">
          <span class="brand-mark">
            <app-icon name="sparkle" />
          </span>
          <span class="brand-text">
            <strong>{{ i18n.t('brand') }}</strong>
            <small>CANELLA MAX</small>
          </span>
        </a>

        <nav class="nav" [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">
            {{ i18n.t('home') }}
          </a>
          <div class="dropdown">
            <a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">
              {{ i18n.t('categories') }}
            </a>
            <div class="dropdown-menu">
              @for (c of ps.categories; track c.slug) {
                <a [routerLink]="['/category', c.slug]" (click)="closeMenu()">
                  <app-icon [name]="c.icon" />
                  <span>{{ i18n.tr(c.name) }}</span>
                  <b class="count">{{ c.products.length }}</b>
                </a>
              }
            </div>
          </div>
          <a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">
            {{ i18n.t('allProducts') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">
            {{ i18n.t('contact') }}
          </a>
        </nav>

        <div class="header-actions">
          <button type="button" class="lang-btn" (click)="i18n.toggle()" [attr.aria-label]="'Switch language'">
            <app-icon name="globe" />
            <span>{{ i18n.isAr() ? 'English' : 'العربية' }}</span>
          </button>

          <button type="button" class="cart-btn" (click)="cart.open()" [attr.aria-label]="i18n.t('cartTitle')">
            <app-icon name="cart" />
            <span class="cart-label">{{ i18n.t('cartTitle') }}</span>
            @if (cart.totalCount() > 0) {
              <b class="cart-badge">{{ cart.totalCount() }}</b>
            }
          </button>

          <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="order-btn">
            <app-icon name="whatsapp" />
            <span>{{ i18n.t('orderNow') }}</span>
          </a>

          <button type="button" class="burger" (click)="menuOpen.set(!menuOpen())" [attr.aria-label]="'Menu'">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    .site-header {
      position: fixed;
      inset-inline: 0;
      top: 0;
      z-index: 100;
      height: var(--header-h);
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.86);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(123, 47, 168, 0.1);
      transition: box-shadow 0.3s, background 0.3s;

      &.scrolled {
        background: rgba(255, 255, 255, 0.96);
        box-shadow: var(--shadow-sm);
      }
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;

      .brand-mark {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--purple-700), var(--purple-500));
        color: var(--gold-300);
        display: grid;
        place-items: center;
        font-size: 1.35rem;
        box-shadow: 0 8px 20px rgba(123, 47, 168, 0.3);
      }

      .brand-text {
        display: flex;
        flex-direction: column;
        line-height: 1.15;

        strong {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--purple-800);
        }

        small {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          color: var(--gold-500);
          font-weight: 700;
        }
      }
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 0.35rem;

      > a,
      .dropdown > a {
        padding: 0.5rem 1rem;
        border-radius: 999px;
        font-weight: 700;
        color: var(--ink);
        transition: color 0.2s, background 0.2s;

        &:hover,
        &.active {
          color: var(--purple-700);
          background: var(--purple-100);
        }
      }
    }

    .dropdown {
      position: relative;

      &:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      inset-inline-start: 0;
      min-width: 250px;
      background: var(--white);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      padding: 0.5rem;
      border: 1px solid var(--purple-100);
      opacity: 0;
      visibility: hidden;
      transform: translateY(8px);
      transition: all 0.25s var(--ease);

      a {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.55rem 0.85rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.94rem;
        color: var(--ink);
        transition: background 0.2s, color 0.2s;

        app-icon {
          color: var(--purple-600);
        }

        .count {
          margin-inline-start: auto;
          font-size: 0.76rem;
          background: var(--purple-100);
          color: var(--purple-700);
          padding: 0.1rem 0.55rem;
          border-radius: 999px;
        }

        &:hover {
          background: var(--purple-50);
          color: var(--purple-700);
        }
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .lang-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.45rem 0.9rem;
      border-radius: 999px;
      border: 1.5px solid var(--purple-100);
      background: var(--purple-50);
      color: var(--purple-800);
      font-weight: 700;
      font-size: 0.86rem;
      transition: all 0.2s;

      &:hover {
        border-color: var(--purple-500);
        background: var(--purple-100);
      }
    }

    .cart-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.48rem 1rem;
      border-radius: 999px;
      border: 0;
      background: linear-gradient(135deg, var(--purple-600), var(--purple-800));
      color: var(--white);
      font-weight: 700;
      font-size: 0.88rem;
      box-shadow: 0 6px 18px rgba(123, 47, 168, 0.28);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }

      .cart-badge {
        background: var(--gold-400);
        color: var(--purple-900);
        font-size: 0.74rem;
        font-weight: 900;
        min-width: 20px;
        height: 20px;
        padding: 0 0.35rem;
        border-radius: 999px;
        display: inline-grid;
        place-items: center;
      }
    }

    .order-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.5rem 1.05rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: var(--white);
      font-weight: 700;
      font-size: 0.88rem;
      box-shadow: 0 6px 18px rgba(37, 211, 102, 0.3);
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-2px);
      }
    }

    .burger {
      display: none;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: 1px solid var(--purple-100);
      background: var(--white);
      color: var(--purple-800);
      place-items: center;
      font-size: 1.3rem;
    }

    @media (max-width: 960px) {
      .burger {
        display: grid;
      }

      .order-btn span,
      .cart-label {
        display: none;
      }

      .order-btn,
      .cart-btn {
        padding: 0.55rem;
      }

      .nav {
        position: fixed;
        top: var(--header-h);
        inset-inline: 0;
        background: var(--white);
        flex-direction: column;
        align-items: stretch;
        padding: 1rem 1.25rem 1.5rem;
        box-shadow: var(--shadow-lg);
        border-bottom: 1px solid var(--purple-100);
        max-height: calc(100vh - var(--header-h));
        overflow-y: auto;
        transform: translateY(-120%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.35s var(--ease), opacity 0.25s;

        &.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
      }

      .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        box-shadow: none;
        border: 0;
        padding: 0.25rem 0.75rem;
        background: var(--purple-50);
        margin-top: 0.25rem;
      }
    }
  `,
  host: {
    '(window:scroll)': 'onScroll()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  readonly cart = inject(CartService);
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  onScroll(): void {
    this.scrolled.set(typeof window !== 'undefined' && window.scrollY > 20);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
