import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { I18nService } from '../../core/i18n.service';
import { ProductService } from '../../core/product.service';
import { IconComponent } from '../../shared/icon.component';
import { ProductCardComponent } from '../../shared/product-card.component';

@Component({
  selector: 'app-category',
  imports: [RouterLink, IconComponent, ProductCardComponent],
  template: `
    @if (category(); as cat) {
      <section class="page-banner">
        <div class="container">
          <div class="crumbs">
            <a routerLink="/">{{ i18n.t('home') }}</a>
            <span>/</span>
            <a routerLink="/products">{{ i18n.t('categories') }}</a>
            <span>/</span>
            <span>{{ i18n.tr(cat.name) }}</span>
          </div>
          <h1>{{ i18n.tr(cat.name) }}</h1>
          <p>{{ i18n.tr(cat.description) }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          @if (cat.products.length > 1) {
            <div class="cat-search">
              <app-icon name="search" />
              <input
                type="search"
                [placeholder]="i18n.t('searchShort')"
                [value]="query()"
                (input)="onQuery($event)"
              />
              @if (query()) {
                <button type="button" (click)="query.set('')">
                  <app-icon name="close" />
                </button>
              }
            </div>
          }

          <div class="product-grid">
            @for (p of filteredProducts(); track p.id; let i = $index) {
              <app-product-card [product]="p" [list]="filteredProducts()" [index]="i" />
            }
          </div>

          <div class="other-cats">
            <h2>{{ i18n.t('otherCategories') }}</h2>
            <div class="pill-list">
              @for (c of ps.categories; track c.slug) {
                @if (c.slug !== cat.slug) {
                  <a [routerLink]="['/category', c.slug]" class="cat-pill">
                    <app-icon [name]="c.icon" />
                    <span>{{ i18n.tr(c.name) }}</span>
                    <b>{{ c.products.length }}</b>
                  </a>
                }
              }
            </div>
          </div>
        </div>
      </section>
    } @else {
      <section class="section">
        <div class="container empty">
          <h2>{{ i18n.t('notFound') }}</h2>
          <a routerLink="/" class="btn btn-primary">{{ i18n.t('backHome') }}</a>
        </div>
      </section>
    }
  `,
  styles: `
    .cat-search {
      max-width: 520px;
      margin: 0 auto 1.85rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: var(--white);
      border: 1.5px solid var(--purple-100);
      border-radius: 999px;
      padding: 0.35rem 1rem;
      box-shadow: var(--shadow-sm);
      color: var(--purple-700);

      input {
        flex: 1;
        border: 0;
        background: transparent;
        padding: 0.5rem 0;
        font-family: inherit;
        font-size: 0.94rem;
        outline: none;
      }

      button {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 0;
        background: var(--purple-50);
        color: var(--purple-800);
        display: grid;
        place-items: center;
      }
    }

    .other-cats {
      margin-top: 4.5rem;
      padding-top: 2.5rem;
      border-top: 1px solid var(--purple-100);
      text-align: center;

      h2 {
        font-size: 1.45rem;
        color: var(--purple-800);
        margin-bottom: 1.35rem;
      }
    }

    .pill-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.7rem;
    }

    .cat-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.15rem;
      border-radius: 999px;
      background: var(--white);
      border: 1.5px solid var(--purple-100);
      color: var(--purple-800);
      font-weight: 700;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s;

      b {
        font-size: 0.76rem;
        background: var(--purple-100);
        color: var(--purple-700);
        padding: 0.1rem 0.5rem;
        border-radius: 999px;
      }

      &:hover {
        background: var(--purple-700);
        border-color: var(--purple-700);
        color: var(--white);
        transform: translateY(-2px);

        b {
          background: rgba(255, 255, 255, 0.2);
          color: var(--white);
        }
      }
    }

    .empty {
      padding: 6rem 0;
      text-align: center;

      h2 {
        margin-bottom: 1.5rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  readonly i18n = inject(I18nService);
  readonly ps = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    initialValue: '',
  });

  readonly category = computed(() => this.ps.getCategory(this.slug()));
  readonly query = signal<string>('');
  readonly filteredProducts = computed(() => {
    const cat = this.category();
    return cat ? this.ps.searchProducts(this.query(), cat.products) : [];
  });

  onQuery(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }
}
