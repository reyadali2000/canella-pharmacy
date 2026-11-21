import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { IconComponent } from '../../shared/icon.component';
import { ProductCardComponent } from '../../shared/product-card.component';

@Component({
  selector: 'app-products',
  imports: [RouterLink, IconComponent, ProductCardComponent],
  template: `
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <a routerLink="/">{{ i18n.t('home') }}</a>
          <span>/</span>
          <span>{{ i18n.t('allProducts') }}</span>
        </div>
        <h1>{{ i18n.t('allProducts') }}</h1>
        <p>{{ i18n.t('allProductsSub') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="filter-bar">
          <button
            type="button"
            class="chip"
            [class.active]="selected() === 'all'"
            (click)="selected.set('all')"
          >
            <span>{{ i18n.t('filterAll') }}</span>
            <b>{{ ps.allProducts.length }}</b>
          </button>

          @for (cat of ps.categories; track cat.slug) {
            <button
              type="button"
              class="chip"
              [class.active]="selected() === cat.slug"
              (click)="selected.set(cat.slug)"
            >
              <app-icon [name]="cat.icon" />
              <span>{{ i18n.tr(cat.name) }}</span>
              <b>{{ cat.products.length }}</b>
            </button>
          }
        </div>

        <div class="product-grid">
          @for (p of filtered(); track p.id; let i = $index) {
            <app-product-card [product]="p" [list]="filtered()" [index]="i" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.6rem;
      margin-bottom: 2.75rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1.15rem;
      border-radius: 999px;
      border: 1.5px solid var(--purple-100);
      background: var(--white);
      color: var(--purple-800);
      font-weight: 700;
      font-size: 0.92rem;
      transition: all 0.25s;

      b {
        font-size: 0.74rem;
        background: var(--purple-100);
        color: var(--purple-700);
        padding: 0.1rem 0.5rem;
        border-radius: 999px;
      }

      &:hover {
        border-color: var(--purple-500);
      }

      &.active {
        background: linear-gradient(135deg, var(--purple-600), var(--purple-800));
        border-color: transparent;
        color: var(--white);
        box-shadow: 0 8px 20px rgba(123, 47, 168, 0.3);

        b {
          background: rgba(255, 255, 255, 0.22);
          color: var(--white);
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);

  readonly selected = signal<string>('all');

  readonly filtered = computed(() => {
    const slug = this.selected();
    if (slug === 'all') return this.ps.allProducts;
    return this.ps.getCategory(slug)?.products ?? [];
  });
}
