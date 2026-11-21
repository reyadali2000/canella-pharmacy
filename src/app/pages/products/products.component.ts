import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
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
        <!-- Search bar -->
        <div class="search-box">
          <app-icon name="search" class="s-icon" />
          <input
            type="search"
            [placeholder]="i18n.t('searchPlaceholder')"
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
          />
          @if (searchQuery()) {
            <button type="button" class="clear-btn" (click)="searchQuery.set('')" [attr.aria-label]="i18n.t('clearSearch')">
              <app-icon name="close" />
            </button>
          }
        </div>

        <!-- Category filter chips (horizontally scrollable on mobile) -->
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

        @if (filtered().length === 0) {
          <div class="no-results">
            <app-icon name="search" />
            <h3>{{ i18n.t('noSearchResults') }}</h3>
            <button type="button" class="btn btn-primary" (click)="resetFilters()">
              {{ i18n.t('clearSearch') }}
            </button>
          </div>
        } @else {
          <div class="product-grid">
            @for (p of filtered(); track p.id; let i = $index) {
              <app-product-card [product]="p" [list]="filtered()" [index]="i" />
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .search-box {
      position: relative;
      max-width: 680px;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      background: var(--white);
      border: 2px solid var(--purple-100);
      border-radius: 999px;
      padding: 0.35rem 1.15rem;
      box-shadow: var(--shadow-sm);
      transition: border-color 0.25s, box-shadow 0.25s;

      &:focus-within {
        border-color: var(--purple-600);
        box-shadow: 0 8px 26px rgba(23, 130, 82, 0.16);
      }

      .s-icon {
        color: var(--purple-600);
        font-size: 1.25rem;
        margin-inline-end: 0.65rem;
      }

      input {
        flex: 1;
        border: 0;
        background: transparent;
        padding: 0.6rem 0;
        font-family: inherit;
        font-size: 0.98rem;
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

    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.55rem;
      margin-bottom: 2.25rem;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.5rem 1.1rem;
      border-radius: 999px;
      border: 1.5px solid var(--purple-100);
      background: var(--white);
      color: var(--purple-800);
      font-weight: 700;
      font-size: 0.9rem;
      white-space: nowrap;
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
        box-shadow: 0 8px 20px rgba(23, 130, 82, 0.28);

        b {
          background: rgba(255, 255, 255, 0.22);
          color: var(--white);
        }
      }
    }

    .no-results {
      text-align: center;
      padding: 3.5rem 1.5rem;
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);

      app-icon {
        font-size: 2.6rem;
        color: var(--purple-600);
        margin-bottom: 0.85rem;
      }

      h3 {
        font-size: 1.2rem;
        color: var(--purple-900);
        margin-bottom: 1.2rem;
      }
    }

    @media (max-width: 640px) {
      .search-box {
        padding: 0.25rem 0.9rem;
        margin-bottom: 1rem;

        input {
          font-size: 0.88rem;
        }
      }

      .filter-bar {
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 0.45rem;
        margin-bottom: 1.4rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }

      .chip {
        padding: 0.42rem 0.85rem;
        font-size: 0.82rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  readonly selected = signal<string>('all');
  readonly searchQuery = signal<string>('');

  constructor() {
    const initialQ = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('q') ?? '')), {
      initialValue: '',
    });
    if (initialQ()) {
      this.searchQuery.set(initialQ());
    }
  }

  readonly filtered = computed(() => {
    const slug = this.selected();
    const base = slug === 'all' ? this.ps.allProducts : (this.ps.getCategory(slug)?.products ?? []);
    return this.ps.searchProducts(this.searchQuery(), base);
  });

  onSearchInput(e: Event): void {
    this.searchQuery.set((e.target as HTMLInputElement).value);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selected.set('all');
  }
}
