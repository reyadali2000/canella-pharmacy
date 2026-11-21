import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';
import { CartDrawerComponent } from './shared/cart-drawer.component';
import { LightboxComponent } from './shared/lightbox.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LightboxComponent, CartDrawerComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-lightbox />
    <app-cart-drawer />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
