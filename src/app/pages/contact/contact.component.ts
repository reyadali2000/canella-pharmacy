import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { IconComponent } from '../../shared/icon.component';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, IconComponent, RevealDirective],
  template: `
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <a routerLink="/">{{ i18n.t('home') }}</a>
          <span>/</span>
          <span>{{ i18n.t('contact') }}</span>
        </div>
        <h1>{{ i18n.t('contact') }}</h1>
        <p>{{ i18n.t('contactSub') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="wish-card" appReveal>
          <span class="spark"><app-icon name="sparkle" /></span>
          <p>{{ i18n.t('greeting') }}</p>
        </div>

        <div class="contact-grid">
          <!-- Phone & WhatsApp -->
          <div class="box" appReveal>
            <span class="label">{{ i18n.t('orderInquiry') }}</span>
            <h2>{{ i18n.t('callUs') }} / {{ i18n.t('whatsapp') }}</h2>
            <div class="big-phone" dir="ltr">{{ ps.contact.phone }}</div>

            <div class="action-stack">
              <a [href]="ps.whatsappUrl()" target="_blank" rel="noopener" class="btn btn-whatsapp">
                <app-icon name="whatsapp" />
                <span>{{ i18n.t('orderWhatsapp') }}</span>
              </a>
              <a [href]="'tel:' + ps.contact.phoneHref" class="btn btn-primary">
                <app-icon name="phone" />
                <span>{{ i18n.t('callUs') }}: <b dir="ltr">{{ ps.contact.phone }}</b></span>
              </a>
            </div>
          </div>

          <!-- Social links -->
          <div class="box" appReveal [revealDelay]="100">
            <span class="label">CANELLA MAX</span>
            <h2>{{ i18n.t('followUs') }}</h2>
            <p class="sub">{{ i18n.t('followUsSub') }}</p>

            <div class="social-cards">
              <a [href]="ps.contact.instagram" target="_blank" rel="noopener" class="soc-card ig">
                <span class="s-icon"><app-icon name="instagram" /></span>
                <div class="s-info">
                  <strong>Instagram</strong>
                  <small dir="ltr">&#64;canellamax_co</small>
                </div>
                <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
              </a>

              <a [href]="ps.contact.facebook" target="_blank" rel="noopener" class="soc-card fb">
                <span class="s-icon"><app-icon name="facebook" /></span>
                <div class="s-info">
                  <strong>Facebook</strong>
                  <small>CANELLA MAX</small>
                </div>
                <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
              </a>

              <a [href]="ps.contact.tiktok" target="_blank" rel="noopener" class="soc-card tt">
                <span class="s-icon"><app-icon name="tiktok" /></span>
                <div class="s-info">
                  <strong>TikTok</strong>
                  <small dir="ltr">&#64;canellamax.yemen</small>
                </div>
                <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .wish-card {
      background: linear-gradient(135deg, var(--purple-800), var(--purple-600));
      color: var(--white);
      border-radius: var(--radius-lg);
      padding: 2.25rem;
      text-align: center;
      box-shadow: var(--shadow-md);
      margin-bottom: 2.5rem;
      position: relative;
      overflow: hidden;

      .spark {
        display: inline-grid;
        place-items: center;
        width: 48px;
        height: 48px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.14);
        color: var(--gold-300);
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
      }

      p {
        margin: 0;
        font-size: clamp(1.1rem, 2.2vw, 1.4rem);
        font-weight: 800;
        color: var(--gold-300);
      }
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .box {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 2.5rem 2.25rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(123, 47, 168, 0.1);

      .label {
        display: inline-block;
        color: var(--gold-500);
        font-weight: 800;
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        margin-bottom: 0.35rem;
      }

      h2 {
        font-size: 1.6rem;
        color: var(--purple-900);
        margin-bottom: 0.65rem;
      }

      .sub {
        color: var(--muted);
        margin: 0 0 1.5rem;
      }
    }

    .big-phone {
      font-size: clamp(2rem, 4vw, 2.75rem);
      font-weight: 900;
      color: var(--purple-700);
      letter-spacing: 0.06em;
      margin: 1rem 0 1.75rem;
    }

    .action-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 0.85rem;
    }

    .social-cards {
      display: grid;
      gap: 0.9rem;
    }

    .soc-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-radius: var(--radius-md);
      background: var(--purple-50);
      border: 1px solid var(--purple-100);
      transition: transform 0.25s var(--ease), box-shadow 0.25s;

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-sm);
      }

      .s-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        color: var(--white);
        font-size: 1.4rem;
        flex-shrink: 0;
      }

      &.ig .s-icon {
        background: linear-gradient(135deg, #f09433, #dc2743, #bc1888);
      }
      &.fb .s-icon {
        background: #1877f2;
      }
      &.tt .s-icon {
        background: #111111;
      }

      .s-info {
        flex: 1;

        strong {
          display: block;
          color: var(--purple-900);
          font-size: 1.05rem;
        }
        small {
          color: var(--muted);
          font-size: 0.86rem;
        }
      }
    }

    @media (max-width: 820px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
}
