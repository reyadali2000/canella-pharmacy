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

  /**
   * Smart bilingual search across product Arabic/English names, descriptions,
   * category names, SKU, and size. Normalizes common Arabic character variants.
   */
  searchProducts(query: string, pool: Product[] = this.allProducts): Product[] {
    const cleaned = this.normalize(query);
    if (!cleaned) return pool;
    const tokens = cleaned.split(/\s+/).filter(Boolean);

    return pool.filter((p) => {
      const cat = this.getCategory(p.categorySlug);
      const haystack = this.normalize(
        [
          p.name.ar,
          p.name.en,
          p.subtitle.ar,
          p.subtitle.en,
          p.sku,
          p.size ?? '',
          cat?.name.ar ?? '',
          cat?.name.en ?? '',
        ].join(' '),
      );
      return tokens.every((tok) => haystack.includes(tok));
    });
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
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

  prescriptionWhatsappUrl(): string {
    const text = this.i18n.t('waPrescriptionMsg');
    return `https://wa.me/${this.contact.whatsappInt}?text=${encodeURIComponent(text)}`;
  }
}
