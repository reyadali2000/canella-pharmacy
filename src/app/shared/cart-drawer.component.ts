import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../core/cart.service';
import { I18nService } from '../core/i18n.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-cart-drawer',
  imports: [IconComponent],
  template: `
    @if (cart.isOpen()) {
      <div class="backdrop" (click)="cart.close()">
        <aside class="drawer" (click)="$event.stopPropagation()">
          <header class="drawer-head">
            <div class="title">
              <span class="icon-badge"><app-icon name="cart" /></span>
              <div>
                <h2>{{ i18n.t('cartTitle') }}</h2>
                <small>{{ cart.totalCount() }} {{ i18n.t('productsCount') }}</small>
              </div>
            </div>

            <div class="head-actions">
              @if (cart.items().length) {
                <button type="button" class="clear-btn" (click)="cart.clear()">
                  <app-icon name="trash" />
                  <span>{{ i18n.t('clearCart') }}</span>
                </button>
              }
              <button type="button" class="close-btn" (click)="cart.close()" [attr.aria-label]="i18n.t('close')">
                <app-icon name="close" />
              </button>
            </div>
          </header>

          @if (cart.items().length === 0) {
            <div class="empty-state">
              <div class="empty-icon"><app-icon name="cart" /></div>
              <h3>{{ i18n.t('cartEmpty') }}</h3>
              <p>{{ i18n.t('cartEmptySub') }}</p>
              <button type="button" class="btn btn-primary" (click)="cart.close()">
                {{ i18n.t('continueShopping') }}
              </button>
            </div>
          } @else {
            <div class="items-list">
              @for (item of cart.items(); track item.product.id) {
                <div class="cart-item">
                  <img [src]="item.product.image" [alt]="i18n.tr(item.product.name)" />

                  <div class="item-info">
                    <h4>{{ i18n.tr(item.product.name) }}</h4>
                    <div class="unit-meta">
                      <span>{{ i18n.formatPrice(item.product.price) }}</span>
                      <small dir="ltr">#{{ item.product.sku }}</small>
                    </div>

                    <div class="item-controls">
                      <div class="qty-pill">
                        <button type="button" (click)="cart.add(item.product, -1)" aria-label="Decrease">
                          <app-icon name="minus" />
                        </button>
                        <span>{{ item.qty }}</span>
                        <button type="button" (click)="cart.add(item.product, 1)" aria-label="Increase">
                          <app-icon name="plus" />
                        </button>
                      </div>

                      <strong class="sub-total">
                        {{ i18n.formatPrice(item.product.price * item.qty) }}
                      </strong>

                      <button
                        type="button"
                        class="del-btn"
                        (click)="cart.remove(item.product.id)"
                        [attr.aria-label]="i18n.t('removeItem')"
                      >
                        <app-icon name="trash" />
                      </button>
                    </div>
                  </div>
                </div>
              }

              <div class="customer-box">
                <h3>{{ i18n.t('customerInfo') }}</h3>
                <input
                  type="text"
                  [placeholder]="i18n.t('customerName')"
                  [value]="cart.customerName()"
                  (input)="cart.customerName.set(asValue($event))"
                />
                <input
                  type="tel"
                  [placeholder]="i18n.t('customerPhone')"
                  [value]="cart.customerPhone()"
                  (input)="cart.customerPhone.set(asValue($event))"
                />
                <textarea
                  rows="2"
                  [placeholder]="i18n.t('customerAddress')"
                  [value]="cart.customerAddress()"
                  (input)="cart.customerAddress.set(asValue($event))"
                ></textarea>
              </div>
            </div>

            <footer class="drawer-foot">
              <div class="summary-row">
                <span>{{ i18n.t('totalItems') }}</span>
                <b>{{ cart.totalCount() }}</b>
              </div>
              <div class="summary-row grand">
                <span>{{ i18n.t('totalAmount') }}</span>
                <strong>{{ i18n.formatPrice(cart.totalPrice()) }}</strong>
              </div>

              <a
                [href]="cart.checkoutWhatsappUrl()"
                target="_blank"
                rel="noopener"
                class="btn btn-whatsapp checkout-btn"
              >
                <app-icon name="whatsapp" />
                <span>{{ i18n.t('checkoutWhatsapp') }}</span>
              </a>
            </footer>
          }
        </aside>
      </div>
    }
  `,
  styles: `
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 250;
      background: rgba(20, 6, 32, 0.72);
      backdrop-filter: blur(6px);
      display: flex;
      justify-content: flex-end;
      animation: fadeIn 0.2s ease;
    }

    .drawer {
      width: min(460px, 100vw);
      height: 100%;
      background: var(--white);
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.3s var(--ease);
    }

    .drawer-head {
      padding: 1.2rem 1.35rem;
      border-bottom: 1px solid var(--purple-100);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      background: var(--purple-50);

      .title {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: linear-gradient(135deg, var(--purple-700), var(--purple-500));
          color: var(--gold-300);
          display: grid;
          place-items: center;
          font-size: 1.25rem;
        }

        h2 {
          font-size: 1.15rem;
          color: var(--purple-900);
          font-weight: 800;
        }

        small {
          color: var(--muted);
          font-weight: 700;
        }
      }

      .head-actions {
        display: flex;
        align-items: center;
        gap: 0.45rem;
      }

      .clear-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.4rem 0.75rem;
        border-radius: 999px;
        border: 1px solid rgba(200, 35, 65, 0.25);
        background: #fff1f4;
        color: #b41e3c;
        font-weight: 700;
        font-size: 0.78rem;
      }

      .close-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 0;
        background: var(--white);
        color: var(--purple-900);
        display: grid;
        place-items: center;
        font-size: 1.1rem;
      }
    }

    .empty-state {
      flex: 1;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;

      .empty-icon {
        width: 78px;
        height: 78px;
        border-radius: 24px;
        background: var(--purple-100);
        color: var(--purple-700);
        display: grid;
        place-items: center;
        font-size: 2.3rem;
        margin-bottom: 1.25rem;
      }

      h3 {
        font-size: 1.25rem;
        color: var(--purple-900);
        margin-bottom: 0.45rem;
      }

      p {
        color: var(--muted);
        margin: 0 0 1.5rem;
      }
    }

    .items-list {
      flex: 1;
      overflow-y: auto;
      padding: 1.1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .cart-item {
      display: flex;
      gap: 0.85rem;
      padding: 0.85rem;
      border-radius: 16px;
      background: var(--purple-50);
      border: 1px solid var(--purple-100);

      img {
        width: 74px;
        height: 74px;
        border-radius: 12px;
        object-fit: cover;
        background: var(--white);
        flex-shrink: 0;
      }

      .item-info {
        flex: 1;
        min-width: 0;

        h4 {
          font-size: 0.94rem;
          font-weight: 800;
          color: var(--purple-900);
          margin: 0 0 0.25rem;
        }

        .unit-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--muted);
          font-weight: 700;
          margin-bottom: 0.55rem;
        }
      }
    }

    .item-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;

      .qty-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        background: var(--white);
        border: 1px solid var(--purple-100);
        border-radius: 999px;
        padding: 0.15rem 0.3rem;

        button {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 0;
          background: var(--purple-700);
          color: var(--white);
          display: grid;
          place-items: center;
          font-size: 0.8rem;
        }

        span {
          font-weight: 800;
          font-size: 0.9rem;
          min-width: 1.4rem;
          text-align: center;
        }
      }

      .sub-total {
        font-weight: 900;
        color: var(--purple-800);
        font-size: 0.95rem;
      }

      .del-btn {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        border: 0;
        background: #ffe9ee;
        color: #c62348;
        display: grid;
        place-items: center;
      }
    }

    .customer-box {
      margin-top: 0.5rem;
      padding: 1rem;
      border-radius: 16px;
      background: var(--white);
      border: 1px dashed var(--purple-500);
      display: grid;
      gap: 0.6rem;

      h3 {
        font-size: 0.9rem;
        color: var(--purple-800);
        margin-bottom: 0.15rem;
      }

      input,
      textarea {
        width: 100%;
        padding: 0.6rem 0.85rem;
        border-radius: 10px;
        border: 1px solid var(--purple-100);
        background: var(--purple-50);
        font-family: inherit;
        font-size: 0.88rem;
        outline: none;

        &:focus {
          border-color: var(--purple-600);
          background: var(--white);
        }
      }
    }

    .drawer-foot {
      padding: 1.15rem 1.35rem 1.35rem;
      border-top: 1px solid var(--purple-100);
      background: var(--purple-50);

      .summary-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9rem;
        color: var(--muted);
        margin-bottom: 0.35rem;

        &.grand {
          font-size: 1.15rem;
          color: var(--purple-900);
          margin-bottom: 1rem;

          strong {
            font-size: 1.35rem;
            font-weight: 900;
            color: var(--purple-800);
          }
        }
      }

      .checkout-btn {
        width: 100%;
        justify-content: center;
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

    @keyframes slideIn {
      from {
        transform: translateX(40px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDrawerComponent {
  readonly cart = inject(CartService);
  readonly i18n = inject(I18nService);

  asValue(e: Event): string {
    return (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  }
}
