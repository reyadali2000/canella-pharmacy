import { Injectable, inject, signal } from '@angular/core';
import { CartService } from './cart.service';
import { I18nService } from './i18n.service';
import { CATEGORIES, CONTACT, Category, Product, SLIDES, SlideItem } from './products.data';

export interface LightboxState {
  products: Product[];
  index: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly i18n = inject(I18nService);
  private readonly cart = inject(CartService);

  readonly categories: Category[] = CATEGORIES;
  readonly slides: SlideItem[] = SLIDES;
  readonly contact = CONTACT;
  readonly allProducts: Product[] = CATEGORIES.flatMap((c) => c.products);
  readonly featuredProducts: Product[] = this.allProducts.filter((p) => p.featured);

  /** Active lightbox state (`null` when closed). */
  readonly lightbox = signal<LightboxState | null>(null);

  constructor() {
    this.cart.hydrate(this.allProducts);
  }

  getCategory(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  getCategoryName(slug: string): string {
    const cat = this.getCategory(slug);
    return cat ? this.i18n.tr(cat.name) : '';
  }

  openLightbox(products: Product[], index: number): void {
    this.lightbox.set({ products, index });
  }

  closeLightbox(): void {
    this.lightbox.set(null);
  }

  stepLightbox(delta: number): void {
    this.lightbox.update((state) => {
      if (!state) return null;
      const len = state.products.length;
      return { ...state, index: (state.index + delta + len) % len };
    });
  }

  whatsappUrl(product?: Product): string {
    const text = product
      ? `${this.i18n.t('waMessage')} ${this.i18n.tr(product.name)} (${this.i18n.formatPrice(product.price)})`
      : this.i18n.t('waGeneral');
    return `https://wa.me/${this.contact.whatsappInt}?text=${encodeURIComponent(text)}`;
  }
}
