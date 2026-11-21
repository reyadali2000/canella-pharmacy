import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartService } from '../core/cart.service';
import { I18nService } from '../core/i18n.service';
import { ProductService } from '../core/product.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-lightbox',
  imports: [IconComponent],
  template: `
    @if (ps.lightbox(); as lb) {
      @if (current(); as p) {
        <div class="overlay" (click)="ps.closeLightbox()">
          <div class="dialog" (click)="$event.stopPropagation()">
            <button type="button" class="close-btn" (click)="ps.closeLightbox()" [attr.aria-label]="i18n.t('close')">
              <app-icon name="close" />
            </button>

            @if (lb.products.length > 1) {
              <button type="button" class="nav-btn prev" (click)="ps.stepLightbox(-1)" [attr.aria-label]="i18n.t('prev')">
                <app-icon [name]="i18n.isAr() ? 'chevronRight' : 'chevronLeft'" />
              </button>
              <button type="button" class="nav-btn next" (click)="ps.stepLightbox(1)" [attr.aria-label]="i18n.t('next')">
                <app-icon [name]="i18n.isAr() ? 'chevronLeft' : 'chevronRight'" />
              </button>
            }

            <div class="img-wrap">
              <img [src]="p.image" [alt]="i18n.tr(p.name)" />
            </div>

            <div class="info">
              <div class="meta">
                <span class="cat">{{ ps.getCategoryName(p.categorySlug) }}</span>
                @if (p.size) {
                  <span class="size" dir="ltr">{{ p.size }}</span>
                }
                <span class="sku" dir="ltr">{{ i18n.t('sku') }}: {{ p.sku }}</span>
                @if (lb.products.length > 1) {
                  <span class="counter" dir="ltr">{{ lb.index + 1 }} / {{ lb.products.length }}</span>
                }
              </div>

              <h2>{{ i18n.tr(p.name) }}</h2>
              <p>{{ i18n.tr(p.subtitle) }}</p>

              <div class="price-box">
                <span>{{ i18n.t('price') }}</span>
                <strong>{{ i18n.formatPrice(p.price) }}</strong>
              </div>

              <div class="cart-row">
                @if (cart.getQty(p.id) === 0) {
                  <button type="button" class="btn btn-primary full" (click)="cart.add(p, 1)">
                    <app-icon name="cart" />
                    <span>{{ i18n.t('addToCart') }}</span>
                  </button>
                } @else {
                  <div class="lb-qty">
                    <button type="button" (click)="cart.add(p, -1)">
                      <app-icon name="minus" />
                    </button>
                    <span>{{ cart.getQty(p.id) }} {{ i18n.t('inCart') }}</span>
                    <button type="button" (click)="cart.add(p, 1)">
                      <app-icon name="plus" />
                    </button>
                  </div>
                  <button type="button" class="btn btn-gold" (click)="openCart()">
                    <app-icon name="cart" />
                    <span>{{ i18n.t('cartTitle') }}</span>
                  </button>
                }
              </div>

              <div class="cta-row">
                <a [href]="ps.whatsappUrl(p)" target="_blank" rel="noopener" class="btn btn-whatsapp">
                  <app-icon name="whatsapp" />
                  <span>{{ i18n.t('orderWhatsapp') }}</span>
                </a>
                <a [href]="'tel:' + ps.contact.phoneHref" class="btn btn-call">
                  <app-icon name="phone" />
                  <span dir="ltr">{{ ps.contact.phone }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    }
  `,
  styles: `
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(20, 6, 32, 0.85);
      backdrop-filter: blur(10px);
      display: grid;
      place-items: center;
      padding: 1.25rem;
      animation: fadeIn 0.25s ease;
    }

    .dialog {
      position: relative;
      width: min(1060px, 100%);
      max-height: 92vh;
      background: var(--white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      box-shadow: var(--shadow-lg);
      animation: popIn 0.3s var(--ease);
    }

    .img-wrap {
      background: #170824;
      display: grid;
      place-items: center;
      max-height: 92vh;
      overflow: auto;

      img {
        width: 100%;
        height: 100%;
        max-height: 90vh;
        object-fit: contain;
      }
    }

    .info {
      padding: 2rem 1.85rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-y: auto;

      h2 {
        font-size: 1.4rem;
        font-weight: 800;
        color: var(--purple-900);
        margin: 0.7rem 0 0.45rem;
      }

      p {
        color: var(--muted);
        font-size: 0.96rem;
        margin: 0 0 1.2rem;
      }
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.45rem;

      .cat {
        background: var(--purple-100);
        color: var(--purple-700);
        font-weight: 700;
        font-size: 0.8rem;
        padding: 0.2rem 0.75rem;
        border-radius: 999px;
      }

      .size {
        background: var(--purple-800);
        color: var(--gold-300);
        font-weight: 700;
        font-size: 0.78rem;
        padding: 0.2rem 0.7rem;
        border-radius: 999px;
      }

      .sku {
        font-size: 0.78rem;
        color: var(--muted);
        font-weight: 700;
      }

      .counter {
        margin-inline-start: auto;
        font-size: 0.82rem;
        color: var(--muted);
        font-weight: 700;
      }
    }

    .price-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.85rem 1.15rem;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--purple-50), var(--purple-100));
      border: 1px solid rgba(123, 47, 168, 0.14);
      margin-bottom: 1.15rem;

      span {
        font-weight: 700;
        color: var(--purple-800);
      }

      strong {
        font-size: 1.45rem;
        font-weight: 900;
        color: var(--purple-900);
      }
    }

    .cart-row {
      display: flex;
      gap: 0.65rem;
      margin-bottom: 0.85rem;

      .full {
        width: 100%;
        justify-content: center;
      }
    }

    .lb-qty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--purple-100);
      border-radius: 999px;
      padding: 0.3rem 0.45rem;

      button {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 0;
        background: var(--purple-700);
        color: var(--white);
        display: grid;
        place-items: center;
      }

      span {
        font-weight: 800;
        color: var(--purple-900);
      }
    }

    .cta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;

      .btn {
        flex: 1;
        justify-content: center;
        padding: 0.7rem 1.1rem;
        font-size: 0.92rem;
      }

      .btn-call {
        background: var(--purple-50);
        color: var(--purple-800);
        border: 1.5px solid var(--purple-100);
      }
    }

    .close-btn {
      position: absolute;
      top: 0.9rem;
      inset-inline-end: 0.9rem;
      z-index: 5;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 0;
      background: rgba(42, 15, 61, 0.85);
      color: var(--white);
      display: grid;
      place-items: center;
      font-size: 1.25rem;
      transition: transform 0.2s, background 0.2s;

      &:hover {
        transform: rotate(90deg);
        background: var(--purple-600);
      }
    }

    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 5;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 0;
      background: rgba(255, 255, 255, 0.92);
      color: var(--purple-900);
      box-shadow: var(--shadow-md);
      display: grid;
      place-items: center;
      font-size: 1.35rem;
      transition: background 0.2s, color 0.2s;

      &:hover {
        background: var(--purple-700);
        color: var(--white);
      }

      &.prev {
        inset-inline-start: 0.9rem;
      }
      &.next {
        inset-inline-end: 0.9rem;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (max-width: 820px) {
      .dialog {
        grid-template-columns: 1fr;
        max-height: 94vh;
        overflow-y: auto;
      }
      .img-wrap img {
        max-height: 52vh;
      }
      .info {
        padding: 1.35rem;

        h2 {
          font-size: 1.15rem;
        }
      }
    }
  `,
  host: {
    '(window:keydown)': 'onKey($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  readonly cart = inject(CartService);

  readonly current = computed(() => {
    const lb = this.ps.lightbox();
    return lb ? lb.products[lb.index] : null;
  });

  openCart(): void {
    this.ps.closeLightbox();
    this.cart.open();
  }

  onKey(e: KeyboardEvent): void {
    if (!this.ps.lightbox()) return;
    if (e.key === 'Escape') this.ps.closeLightbox();
    if (e.key === 'ArrowRight') this.ps.stepLightbox(this.i18n.isAr() ? -1 : 1);
    if (e.key === 'ArrowLeft') this.ps.stepLightbox(this.i18n.isAr() ? 1 : -1);
  }
}
