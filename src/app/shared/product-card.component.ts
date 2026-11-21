import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CartService } from '../core/cart.service';
import { I18nService } from '../core/i18n.service';
import { ProductService } from '../core/product.service';
import { Product } from '../core/products.data';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-product-card',
  imports: [IconComponent],
  template: `
    <article class="card">
      <div class="media" (click)="open()">
        <img [src]="product().image" [alt]="i18n.tr(product().name)" loading="lazy" />
        @if (product().size) {
          <span class="badge-size" dir="ltr">{{ product().size }}</span>
        }
        <span class="badge-price">{{ i18n.formatPrice(product().price) }}</span>

        <button type="button" class="zoom-btn" [attr.aria-label]="i18n.t('viewDetails')">
          <app-icon name="zoom" />
          <span>{{ i18n.t('viewDetails') }}</span>
        </button>
      </div>

      <div class="body">
        <div class="top-meta">
          <span class="cat-tag">{{ ps.getCategoryName(product().categorySlug) }}</span>
          <span class="sku-tag" dir="ltr">#{{ product().sku }}</span>
        </div>

        <h3 (click)="open()">{{ i18n.tr(product().name) }}</h3>
        <p>{{ i18n.tr(product().subtitle) }}</p>

        <div class="price-row">
          <span class="price-label">{{ i18n.t('price') }}:</span>
          <strong class="price-val">{{ i18n.formatPrice(product().price) }}</strong>
        </div>

        <div class="actions">
          @if (qty() === 0) {
            <button type="button" class="btn-add" (click)="cart.add(product(), 1)">
              <app-icon name="cart" />
              <span>{{ i18n.t('addToCart') }}</span>
            </button>
          } @else {
            <div class="qty-control">
              <button type="button" class="q-btn" (click)="cart.add(product(), -1)" aria-label="Decrease">
                <app-icon name="minus" />
              </button>
              <span class="q-val">{{ qty() }}</span>
              <button type="button" class="q-btn" (click)="cart.add(product(), 1)" aria-label="Increase">
                <app-icon name="plus" />
              </button>
            </div>
          }

          <button type="button" class="btn-icon-view" (click)="open()" [attr.aria-label]="i18n.t('viewDetails')">
            <app-icon name="zoom" />
          </button>
        </div>
      </div>
    </article>
  `,
  styles: `
    .card {
      background: var(--white);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(123, 47, 168, 0.08);
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease);

      &:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-md);

        .media img {
          transform: scale(1.06);
        }

        .zoom-btn {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }

    .media {
      position: relative;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      background: var(--purple-50);
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.55s var(--ease);
      }
    }

    .badge-size {
      position: absolute;
      top: 0.85rem;
      inset-inline-start: 0.85rem;
      background: rgba(22, 43, 36, 0.84);
      backdrop-filter: blur(8px);
      color: var(--gold-300);
      font-weight: 700;
      font-size: 0.76rem;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
    }

    .badge-price {
      position: absolute;
      top: 0.85rem;
      inset-inline-end: 0.85rem;
      background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
      color: var(--white);
      font-weight: 900;
      font-size: 0.84rem;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
    }

    .zoom-btn {
      position: absolute;
      inset-inline: 1rem;
      bottom: 1rem;
      padding: 0.6rem 1rem;
      border-radius: 999px;
      border: 0;
      background: rgba(22, 43, 36, 0.88);
      backdrop-filter: blur(10px);
      color: var(--white);
      font-weight: 700;
      font-size: 0.86rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
    }

    .body {
      padding: 1.15rem 1.25rem 1.3rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      .top-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.4rem;
        margin-bottom: 0.5rem;
      }

      .cat-tag {
        font-size: 0.74rem;
        font-weight: 700;
        color: var(--purple-600);
        background: var(--purple-100);
        padding: 0.15rem 0.65rem;
        border-radius: 999px;
      }

      .sku-tag {
        font-size: 0.72rem;
        color: var(--muted);
        font-weight: 600;
      }

      h3 {
        font-size: 1.02rem;
        font-weight: 800;
        color: var(--purple-900);
        margin-bottom: 0.35rem;
        cursor: pointer;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        &:hover {
          color: var(--purple-600);
        }
      }

      p {
        color: var(--muted);
        font-size: 0.85rem;
        margin: 0 0 0.85rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }
    }

    .price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding: 0.55rem 0.8rem;
      border-radius: 12px;
      background: var(--purple-50);
      margin-bottom: 0.85rem;

      .price-label {
        font-size: 0.8rem;
        color: var(--muted);
        font-weight: 700;
      }

      .price-val {
        font-size: 1.12rem;
        font-weight: 900;
        color: var(--purple-800);
      }
    }

    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .btn-add {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.65rem 0.9rem;
      border-radius: 12px;
      border: 0;
      background: linear-gradient(135deg, var(--purple-600), var(--purple-800));
      color: var(--white);
      font-weight: 700;
      font-size: 0.88rem;
      box-shadow: 0 6px 16px rgba(123, 47, 168, 0.28);
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(123, 47, 168, 0.38);
      }
    }

    .qty-control {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--purple-100);
      border-radius: 12px;
      padding: 0.25rem;

      .q-btn {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 0;
        background: var(--purple-700);
        color: var(--white);
        display: grid;
        place-items: center;
        font-size: 0.95rem;
        transition: background 0.2s;

        &:hover {
          background: var(--purple-900);
        }
      }

      .q-val {
        font-weight: 900;
        font-size: 1rem;
        color: var(--purple-900);
        min-width: 2rem;
        text-align: center;
      }
    }

    .btn-icon-view {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      border: 1.5px solid var(--purple-100);
      background: var(--white);
      color: var(--purple-700);
      display: grid;
      place-items: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      transition: background 0.2s, color 0.2s;

      &:hover {
        background: var(--purple-100);
      }
    }

    @media (max-width: 640px) {
      .zoom-btn,
      .sku-tag {
        display: none;
      }
      .body {
        padding: 0.85rem;

        h3 {
          font-size: 0.9rem;
        }
        p {
          font-size: 0.78rem;
        }
      }
      .price-row .price-val {
        font-size: 0.96rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  readonly cart = inject(CartService);

  readonly product = input.required<Product>();
  readonly list = input<Product[]>();
  readonly index = input<number>(0);

  readonly qty = computed(() => this.cart.getQty(this.product().id));

  open(): void {
    const items = this.list() ?? [this.product()];
    this.ps.openLightbox(items, this.index());
  }
}
