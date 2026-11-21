import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type Lang = 'ar' | 'en';

/** A bilingual text value. */
export interface L {
  ar: string;
  en: string;
}

const UI = {
  brand: { ar: 'صيدلية كانيلا', en: 'Canella Pharmacy' },
  tagline: { ar: 'عناية حقيقية لجمالك وصحتك', en: 'Real care for your beauty & health' },
  home: { ar: 'الرئيسية', en: 'Home' },
  categories: { ar: 'الأقسام', en: 'Categories' },
  products: { ar: 'المنتجات', en: 'Products' },
  allProducts: { ar: 'جميع المنتجات', en: 'All Products' },
  contact: { ar: 'تواصل معنا', en: 'Contact Us' },
  orderNow: { ar: 'اطلب الآن', en: 'Order Now' },
  orderWhatsapp: { ar: 'اطلب عبر واتساب', en: 'Order via WhatsApp' },
  browseProducts: { ar: 'تصفح المنتجات', en: 'Browse Products' },
  viewAll: { ar: 'عرض الكل', en: 'View All' },
  viewDetails: { ar: 'عرض التفاصيل', en: 'View Details' },
  product: { ar: 'منتج', en: 'product' },
  productsCount: { ar: 'منتجات', en: 'products' },
  ourCategories: { ar: 'تسوق حسب القسم', en: 'Shop by Category' },
  ourCategoriesSub: {
    ar: 'تشكيلة متكاملة من منتجات كانيلا ماكس للعناية بك وبعائلتك',
    en: 'A complete range of CANELLA MAX products for you and your family',
  },
  featured: { ar: 'منتجات مميزة', en: 'Featured Products' },
  featuredSub: { ar: 'اختيارات مميزة من أكثر منتجاتنا طلباً', en: 'Handpicked favourites from our best sellers' },
  discover: { ar: 'اكتشف', en: 'Discover' },
  whyUs: { ar: 'لماذا كانيلا؟', en: 'Why Canella?' },
  whyUsSub: { ar: 'نهتم بكل تفصيلة لنقدم لك الأفضل', en: 'We care about every detail to bring you the best' },
  f1t: { ar: 'منتجات أصلية', en: 'Authentic Products' },
  f1d: { ar: 'منتجات CANELLA MAX أصلية ومضمونة 100%', en: '100% genuine and guaranteed CANELLA MAX products' },
  f2t: { ar: 'جودة عالمية', en: 'Global Quality' },
  f2d: { ar: 'مصنوعة وفق أعلى معايير الجودة العالمية', en: 'Made to the highest international quality standards' },
  f3t: { ar: 'مكونات طبيعية', en: 'Natural Ingredients' },
  f3d: { ar: 'تركيبات غنية بالزيوت والمستخلصات الطبيعية', en: 'Formulas rich in natural oils and extracts' },
  f4t: { ar: 'طلب سهل وسريع', en: 'Easy Ordering' },
  f4d: { ar: 'اطلب منتجاتك بسهولة عبر الهاتف أو واتساب', en: 'Order easily by phone or WhatsApp' },
  ctaTitle: { ar: 'هل تبحث عن منتج معين؟', en: 'Looking for a specific product?' },
  ctaText: {
    ar: 'تواصل معنا الآن وسنساعدك في اختيار المنتج المناسب لك',
    en: 'Contact us now and we will help you choose the right product',
  },
  filterAll: { ar: 'الكل', en: 'All' },
  allProductsSub: { ar: 'تصفح جميع منتجاتنا واختر ما يناسبك', en: 'Browse all our products and choose what suits you' },
  notFound: { ar: 'القسم غير موجود', en: 'Category not found' },
  backHome: { ar: 'العودة للرئيسية', en: 'Back to Home' },
  otherCategories: { ar: 'أقسام أخرى', en: 'Other Categories' },
  contactSub: {
    ar: 'يسعدنا تواصلكم للطلب والاستفسار في أي وقت',
    en: 'We are happy to hear from you for orders and inquiries anytime',
  },
  greeting: {
    ar: '🌸 من أسرة CANELLA MAX، أطيب الأمنيات لكم ولأحبابكم بيوم مليء بالخير والسعادة.',
    en: '🌸 From the CANELLA MAX family, our warmest wishes to you and your loved ones for a day full of goodness and happiness.',
  },
  orderInquiry: { ar: 'للطلب والاستفسار', en: 'Orders & Inquiries' },
  callUs: { ar: 'اتصل بنا', en: 'Call Us' },
  whatsapp: { ar: 'واتساب', en: 'WhatsApp' },
  followUs: { ar: 'تابعنا', en: 'Follow Us' },
  followUsSub: { ar: 'تابعونا على منصات التواصل لكل جديد', en: 'Follow us on social media for the latest news' },
  quickLinks: { ar: 'روابط سريعة', en: 'Quick Links' },
  rights: { ar: 'جميع الحقوق محفوظة', en: 'All rights reserved' },
  aboutShort: {
    ar: 'صيدلية كانيلا، وجهتك لمنتجات CANELLA MAX الأصلية للعناية بالبشرة والشعر والأسنان.',
    en: 'Canella Pharmacy, your destination for genuine CANELLA MAX skin, hair and dental care products.',
  },
  close: { ar: 'إغلاق', en: 'Close' },
  prev: { ar: 'السابق', en: 'Previous' },
  next: { ar: 'التالي', en: 'Next' },
  waMessage: { ar: 'مرحباً، أرغب في الاستفسار عن منتج:', en: 'Hello, I would like to ask about the product:' },
  waGeneral: { ar: 'مرحباً، أرغب في الاستفسار عن منتجات كانيلا ماكس', en: 'Hello, I would like to ask about CANELLA MAX products' },
} satisfies Record<string, L>;

export type UiKey = keyof typeof UI;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);

  readonly lang = signal<Lang>(this.initialLang());
  readonly isAr = computed(() => this.lang() === 'ar');
  readonly dir = computed(() => (this.isAr() ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      const lang = this.lang();
      const html = this.doc.documentElement;
      html.lang = lang;
      html.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.doc.title = lang === 'ar' ? 'صيدلية كانيلا | Canella Pharmacy' : 'Canella Pharmacy | صيدلية كانيلا';
      try {
        localStorage.setItem('canella-lang', lang);
      } catch {
        /* ignore */
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }

  /** Translate a UI key. */
  t(key: UiKey): string {
    return UI[key][this.lang()];
  }

  /** Pick the current language from a bilingual value. */
  tr(value: L): string {
    return value[this.lang()];
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem('canella-lang');
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      /* ignore */
    }
    return 'ar';
  }
}

