import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { I18nService } from './i18n.service';
import { CONTACT, Product } from './products.data';

export interface CartItem {
  product: Product;
  qty: number;
}

const STORAGE_KEY = 'canella-cart-v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly i18n = inject(I18nService);

  readonly items = signal<CartItem[]>([]);
  readonly isOpen = signal<boolean>(false);

  readonly customerName = signal<string>('');
  readonly customerPhone = signal<string>('');
  readonly customerAddress = signal<string>('');

  readonly totalCount = computed(() => this.items().reduce((sum, i) => sum + i.qty, 0));
  readonly totalPrice = computed(() => this.items().reduce((sum, i) => sum + i.product.price * i.qty, 0));

  constructor() {
    effect(() => {
      const snapshot = this.items().map((i) => ({ id: i.product.id, qty: i.qty }));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        /* ignore */
      }
    });
  }

  /** Hydrate saved cart items from localStorage using the known products catalog. */
  hydrate(allProducts: Product[]): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<{ id: string; qty: number }>;
      if (!Array.isArray(parsed)) return;
      const hydrated: CartItem[] = [];
      for (const entry of parsed) {
        const product = allProducts.find((p) => p.id === entry.id);
        if (product && entry.qty > 0) {
          hydrated.push({ product, qty: entry.qty });
        }
      }
      if (hydrated.length) this.items.set(hydrated);
    } catch {
      /* ignore */
    }
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  getQty(productId: string): number {
    return this.items().find((i) => i.product.id === productId)?.qty ?? 0;
  }

  add(product: Product, delta = 1): void {
    this.items.update((list) => {
      const idx = list.findIndex((i) => i.product.id === product.id);
      if (idx === -1) {
        return delta > 0 ? [...list, { product, qty: delta }] : list;
      }
      const nextQty = list[idx].qty + delta;
      if (nextQty <= 0) {
        return list.filter((_, i) => i !== idx);
      }
      return list.map((item, i) => (i === idx ? { ...item, qty: nextQty } : item));
    });
  }

  setQty(productId: string, qty: number): void {
    if (qty <= 0) {
      this.remove(productId);
      return;
    }
    this.items.update((list) => list.map((i) => (i.product.id === productId ? { ...i, qty } : i)));
  }

  remove(productId: string): void {
    this.items.update((list) => list.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this.items.set([]);
  }

  checkoutWhatsappUrl(): string {
    const ar = this.i18n.isAr();
    const lines: string[] = [];

    lines.push(ar ? '🛍️ *طلب جديد من موقع صيدلية كانيلا (CANELLA MAX)*' : '🛍️ *New Order from Canella Pharmacy (CANELLA MAX)*');
    lines.push('────────────────────');

    this.items().forEach((item, idx) => {
      const name = this.i18n.tr(item.product.name);
      const unit = this.i18n.formatPrice(item.product.price);
      const sub = this.i18n.formatPrice(item.product.price * item.qty);
      lines.push(`${idx + 1}. *${name}*`);
      lines.push(
        ar
          ? `   • رقم الصنف: ${item.product.sku} | الكمية: ${item.qty} × ${unit} = *${sub}*`
          : `   • SKU: ${item.product.sku} | Qty: ${item.qty} × ${unit} = *${sub}*`,
      );
    });

    lines.push('────────────────────');
    lines.push(
      ar
        ? `📦 إجمالي عدد القطع: *${this.totalCount()}*`
        : `📦 Total Items: *${this.totalCount()}*`,
    );
    lines.push(
      ar
        ? `💰 *الإجمالي الكلي: ${this.i18n.formatPrice(this.totalPrice())}*`
        : `💰 *Grand Total: ${this.i18n.formatPrice(this.totalPrice())}*`,
    );

    const name = this.customerName().trim();
    const phone = this.customerPhone().trim();
    const addr = this.customerAddress().trim();
    if (name || phone || addr) {
      lines.push('────────────────────');
      if (name) lines.push(ar ? `👤 الاسم: ${name}` : `👤 Name: ${name}`);
      if (phone) lines.push(ar ? `📞 الهاتف: ${phone}` : `📞 Phone: ${phone}`);
      if (addr) lines.push(ar ? `📍 العنوان/ملاحظات: ${addr}` : `📍 Address/Notes: ${addr}`);
    }

    return `https://wa.me/${CONTACT.whatsappInt}?text=${encodeURIComponent(lines.join('\n'))}`;
  }
}
