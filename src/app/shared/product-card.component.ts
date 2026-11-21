import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
        <button type="button" class="zoom-btn" [attr.aria-label]="i18n.t('viewDetails')">
          <app-icon name="zoom" />
          <span>{{ i18n.t('viewDetails') }}</span>
        </button>
      </div>

      <div class="body">
        <span class="cat-tag">{{ ps.getCategoryName(product().categorySlug) }}</span>
        <h3 (click)="open()">{{ i18n.tr(product().name) }}</h3>
        <p>{{ i18n.tr(product().subtitle) }}</p>

        <div class="actions">
          <button type="button" class="btn-view" (click)="open()">
            <app-icon name="zoom" />
            <span>{{ i18n.t('viewDetails') }}</span>
          </button>
          <a [href]="ps.whatsappUrl(product())" target="_blank" rel="noopener" class="btn-wa" [attr.aria-label]="i18n.t('orderWhatsapp')">
            <app-icon name="whatsapp" />
          </a>
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
      background: rgba(42, 15, 61, 0.82);
      backdrop-filter: blur(8px);
      color: var(--gold-300);
      font-weight: 700;
      font-size: 0.78rem;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
    }

    .zoom-btn {
      position: absolute;
      inset-inline: 1rem;
      bottom: 1rem;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      border: 0;
      background: rgba(42, 15, 61, 0.86);
      backdrop-filter: blur(10px);
      color: var(--white);
      font-weight: 700;
      font-size: 0.88rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
    }

    .body {
      padding: 1.25rem 1.3rem 1.35rem;
      display: flex;
      flex-direction: column;
      flex: 1;

      .cat-tag {
        align-self: flex-start;
        font-size: 0.76rem;
        font-weight: 700;
        color: var(--purple-600);
        background: var(--purple-100);
        padding: 0.15rem 0.65rem;
        border-radius: 999px;
        margin-bottom: 0.55rem;
      }

      h3 {
        font-size: 1.05rem;
        font-weight: 800;
        color: var(--purple-900);
        margin-bottom: 0.4rem;
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
        font-size: 0.88rem;
        margin: 0 0 1.1rem;
        line-height: 1.55;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }
    }

    .actions {
      display: flex;
      gap: 0.55rem;
      margin-top: auto;
    }

    .btn-view {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.6rem 0.9rem;
      border-radius: 12px;
      border: 1.5px solid var(--purple-100);
      background: var(--purple-50);
      color: var(--purple-800);
      font-weight: 700;
      font-size: 0.86rem;
      transition: background 0.2s, border-color 0.2s, color 0.2s;

      &:hover {
        background: var(--purple-700);
        border-color: var(--purple-700);
        color: var(--white);
      }
    }

    .btn-wa {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: var(--white);
      display: grid;
      place-items: center;
      font-size: 1.2rem;
      flex-shrink: 0;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.07);
      }
    }

    @media (max-width: 640px) {
      .zoom-btn {
        display: none;
      }
      .body {
        padding: 0.9rem;

        h3 {
          font-size: 0.92rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);

  readonly product = input.required<Product>();
  readonly list = input<Product[]>();
  readonly index = input<number>(0);

  open(): void {
    const items = this.list() ?? [this.product()];
    this.ps.openLightbox(items, this.index());
  }
}
