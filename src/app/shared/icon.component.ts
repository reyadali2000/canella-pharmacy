import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const ICONS: Record<string, string> = {
  phone:
    '<path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/>',
  whatsapp:
    '<path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.3-.3-.3-.5-.5Z"/>',
  instagram:
    '<path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.4-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM21.9 8c0-1.6-.5-3-1.6-4.2A5.8 5.8 0 0 0 16 2.1C14.4 2 9.6 2 8 2.1c-1.6 0-3 .5-4.2 1.6A5.8 5.8 0 0 0 2.1 8C2 9.6 2 14.4 2.1 16c0 1.6.5 3 1.7 4.2A5.8 5.8 0 0 0 8 21.9c1.6.1 6.4.1 8 0 1.6 0 3-.5 4.2-1.7a5.8 5.8 0 0 0 1.7-4.2c.1-1.6.1-6.4 0-8Zm-2.1 9.7a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.3-.4-5.7s-.1-4.4.4-5.7a3.3 3.3 0 0 1 1.9-1.9C7.4 3.9 10.4 4 12 4s4.6-.1 5.9.4c.9.3 1.6 1 1.9 1.9.5 1.3.4 4.3.4 5.7s.1 4.4-.4 5.7Z"/>',
  facebook:
    '<path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/>',
  tiktok:
    '<path fill="currentColor" d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.7 1.6-3 3.3-2.5V9.6c-3.4-.4-6.4 2.2-6.4 5.7a5.7 5.7 0 0 0 5.7 5.7 5.7 5.7 0 0 0 5.7-5.7V9a7.4 7.4 0 0 0 4.3 1.4V7.3s-1.9.1-3.2-1.5Z"/>',
  globe:
    '<path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
  menu: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/>',
  chevronLeft: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="m15 5-7 7 7 7"/>',
  chevronRight: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="m9 5 7 7-7 7"/>',
  arrow: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/>',
  zoom: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm9 16-4-4M11 8v6M8 11h6"/>',
  shield: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6l-8-3Z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="m8.5 12 2.5 2.5 4.5-5"/>',
  award: '<circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="m8.5 14-1.5 7 5-3 5 3-1.5-7"/>',
  leaf: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15m0-1c3-4 6-7 10-10"/>',
  chat: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 5h16v11H9l-5 4V5Z"/><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M8 9.5h8M8 12.5h5"/>',
  sparkle: '<path fill="currentColor" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 13 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
  cart: '<path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M3 4h2l2.2 10.5a1.8 1.8 0 0 0 1.8 1.5h8.2a1.8 1.8 0 0 0 1.8-1.4L21 7H6"/><circle cx="9.5" cy="19.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="19.5" r="1.5" fill="currentColor"/>',
  plus: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M12 5v14M5 12h14"/>',
  minus: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" d="M5 12h14"/>',
  trash: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v6m4-6v6"/>',
  search: '<circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="m20 20-4.3-4.3"/>',
  // Category icons
  jar: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M5 9h14v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Zm-1-5h16v5H4V4Z"/><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M9 14h6"/>',
  tooth: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 5.5C10 4 6 3.5 5 6.5c-1 3 .5 5.5 1 8 .5 2.8 1 6.5 2.5 6.5S10 16 12 16s2 5 3.5 5 2-3.7 2.5-6.5c.5-2.5 2-5 1-8-1-3-5-2.5-7-1Z"/>',
  bottle: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M10 2h4v3h-4zM9 5h6l1.5 3v12a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2V8L9 5Z"/><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M7.5 12h9"/>',
  mask: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3C7 3 4 6 4 11c0 5 3.5 10 8 10s8-5 8-10c0-5-3-8-8-8Z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M8 10.5h2m4 0h2M9.5 16c1.5 1 3.5 1 5 0"/>',
  drop: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  pump: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M10 2h5M12 2v4M9 6h6v3H9zM7 9h10v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"/>',
  tube: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M6 3h12l-2 13H8L6 3Zm2 13h8v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2Z"/><path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M7 7h10"/>',
  foot: '<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M9 8c-2 3-3 6-2 9 .7 2.4 2.5 4 4.5 4s3.2-1.6 3-4c-.2-2.5-1.5-3.5-1.5-6 0-2 1-3 1-5 0-1.5-1-2.5-2.2-2.3C10 4 10.5 6 9 8Z"/><circle cx="16.5" cy="4.5" r="1.2" fill="currentColor"/><circle cx="18.5" cy="7" r="1" fill="currentColor"/><circle cx="19.3" cy="10" r=".9" fill="currentColor"/>',
};

@Component({
  selector: 'app-icon',
  template: `<svg viewBox="0 0 24 24" aria-hidden="true" [innerHTML]="svg()"></svg>`,
  styles: `
    :host { display: inline-flex; width: 1.25em; height: 1.25em; flex-shrink: 0; }
    svg { width: 100%; height: 100%; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer);
  readonly name = input.required<string>();
  readonly svg = computed<SafeHtml>(() => this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()] ?? ''));
}
