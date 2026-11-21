import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { I18nService } from '../core/i18n.service';
import { ProductService } from '../core/product.service';
import { IconComponent } from '../shared/icon.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, IconComponent],
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="greeting-banner">
          <p>{{ i18n.t('greeting') }}</p>
        </div>

        <div class="footer-grid">
          <div class="col brand-col">
            <div class="brand">
              <span class="mark"><app-icon name="sparkle" /></span>
              <div>
                <strong>{{ i18n.t('brand') }}</strong>
                <small>CANELLA MAX</small>
              </div>
            </div>
            <p class="about">{{ i18n.t('aboutShort') }}</p>

            <div class="socials">
              <a [href]="ps.contact.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="soc ig">
                <app-icon name="instagram" />
              </a>
              <a [href]="ps.contact.facebook" target="_blank" rel="noopener" aria-label="Facebook" class="soc fb">
                <app-icon name="facebook" />
              </a>
              <a [href]="ps.contact.tiktok" target="_blank" rel="noopener" aria-label="TikTok" class="soc tt">
                <app-icon name="tiktok" />
              </a>
              <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" aria-label="WhatsApp" class="soc wa">
                <app-icon name="whatsapp" />
              </a>
            </div>
          </div>

          <div class="col">
            <h3>{{ i18n.t('categories') }}</h3>
            <ul>
              @for (c of ps.categories; track c.slug) {
                <li>
                  <a [routerLink]="['/category', c.slug]">{{ i18n.tr(c.name) }}</a>
                </li>
              }
            </ul>
          </div>

          <div class="col">
            <h3>{{ i18n.t('quickLinks') }}</h3>
            <ul>
              <li><a routerLink="/">{{ i18n.t('home') }}</a></li>
              <li><a routerLink="/products">{{ i18n.t('allProducts') }}</a></li>
              <li><a routerLink="/contact">{{ i18n.t('contact') }}</a></li>
            </ul>
          </div>

          <div class="col contact-col">
            <h3>{{ i18n.t('orderInquiry') }}</h3>
            <a [href]="'tel:' + ps.contact.phoneHref" class="contact-pill">
              <app-icon name="phone" />
              <span dir="ltr">{{ ps.contact.phone }}</span>
            </a>
            <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="contact-pill wa-pill">
              <app-icon name="whatsapp" />
              <span>{{ i18n.t('orderWhatsapp') }}</span>
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <span>© {{ year }} {{ i18n.t('brand') }} (CANELLA MAX) — {{ i18n.t('rights') }}</span>
        </div>
      </div>
    </footer>

    @if (cart.totalCount() > 0) {
      <button type="button" class="floating-cart" (click)="cart.open()">
        <span class="fc-icon">
          <app-icon name="cart" />
          <b>{{ cart.totalCount() }}</b>
        </span>
        <span class="fc-text">
          <small>{{ i18n.t('cartTitle') }}</small>
          <strong>{{ i18n.formatPrice(cart.totalPrice()) }}</strong>
        </span>
      </button>
    }

    <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="floating-wa" [attr.aria-label]="i18n.t('whatsapp')">
      <app-icon name="whatsapp" />
    </a>
  `,
  styles: `
    .site-footer {
      background:
        radial-gradient(circle at 85% 15%, rgba(23, 130, 82, 0.25), transparent 40%),
        linear-gradient(160deg, var(--purple-900), #0e1c17);
      color: rgba(255, 255, 255, 0.88);
      padding: 4rem 0 2rem;
      margin-top: 3rem;
    }

    .greeting-banner {
      background: linear-gradient(135deg, rgba(23, 130, 82, 0.28), rgba(31, 59, 49, 0.45));
      border: 1px solid rgba(127, 224, 178, 0.35);
      border-radius: var(--radius-lg);
      padding: 1.35rem 1.75rem;
      text-align: center;
      margin-bottom: 3.5rem;

      p {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--gold-300);
      }
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 0.9fr 1.1fr;
      gap: 2.5rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;

      .mark {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        background: linear-gradient(135deg, var(--gold-400), var(--gold-500));
        color: var(--purple-900);
        display: grid;
        place-items: center;
        font-size: 1.3rem;
      }

      strong {
        display: block;
        color: var(--white);
        font-size: 1.25rem;
      }

      small {
        color: var(--gold-400);
        letter-spacing: 0.16em;
        font-size: 0.72rem;
        font-weight: 700;
      }
    }

    .about {
      color: rgba(255, 255, 255, 0.72);
      margin: 0 0 1.35rem;
      max-width: 340px;
    }

    .socials {
      display: flex;
      gap: 0.65rem;

      .soc {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        display: grid;
        place-items: center;
        color: var(--white);
        font-size: 1.2rem;
        transition: transform 0.25s, background 0.25s;

        &:hover {
          transform: translateY(-4px);
        }
        &.ig:hover {
          background: linear-gradient(135deg, #f09433, #dc2743, #bc1888);
        }
        &.fb:hover {
          background: #1877f2;
        }
        &.tt:hover {
          background: #000000;
        }
        &.wa:hover {
          background: #25d366;
        }
      }
    }

    .col h3 {
      color: var(--gold-300);
      font-size: 1.05rem;
      margin-bottom: 1.1rem;
    }

    .col ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 0.55rem;

      a {
        color: rgba(255, 255, 255, 0.76);
        transition: color 0.2s, padding-inline-start 0.2s;

        &:hover {
          color: var(--gold-300);
          padding-inline-start: 5px;
        }
      }
    }

    .contact-pill {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      padding: 0.75rem 1.1rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--white);
      font-weight: 700;
      margin-bottom: 0.75rem;
      transition: transform 0.2s, background 0.2s;

      &:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.14);
      }

      &.wa-pill {
        background: linear-gradient(135deg, #25d366, #128c7e);
        border-color: transparent;
      }
    }

    .footer-bottom {
      padding-top: 1.75rem;
      text-align: center;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .floating-cart {
      position: fixed;
      bottom: 1.5rem;
      inset-inline-start: 1.5rem;
      z-index: 90;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.65rem 1.15rem 0.65rem 0.8rem;
      border-radius: 999px;
      border: 1px solid rgba(220, 188, 108, 0.45);
      background: linear-gradient(135deg, var(--purple-900), var(--purple-700));
      color: var(--white);
      box-shadow: var(--shadow-lg);
      transition: transform 0.25s var(--ease);

      &:hover {
        transform: translateY(-3px);
      }

      .fc-icon {
        position: relative;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: var(--gold-400);
        color: var(--purple-900);
        display: grid;
        place-items: center;
        font-size: 1.25rem;

        b {
          position: absolute;
          top: -4px;
          inset-inline-end: -4px;
          background: #e11d48;
          color: var(--white);
          font-size: 0.7rem;
          min-width: 19px;
          height: 19px;
          border-radius: 999px;
          display: grid;
          place-items: center;
        }
      }

      .fc-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        line-height: 1.15;

        small {
          font-size: 0.72rem;
          color: var(--gold-300);
          font-weight: 700;
        }

        strong {
          font-size: 0.95rem;
          font-weight: 900;
        }
      }
    }

    .floating-wa {
      position: fixed;
      bottom: 1.5rem;
      inset-inline-end: 1.5rem;
      z-index: 90;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: var(--white);
      display: grid;
      place-items: center;
      font-size: 1.85rem;
      box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45);
      transition: transform 0.3s var(--ease);
      animation: pulse 2.4s infinite;

      &:hover {
        transform: scale(1.1);
      }
    }

    @keyframes pulse {
      0%,
      100% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55);
      }
      70% {
        box-shadow: 0 0 0 16px rgba(37, 211, 102, 0);
      }
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 560px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  readonly cart = inject(CartService);
  readonly year = new Date().getFullYear();
}
