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
  f4d: { ar: 'أضف منتجاتك للسلة وأرسل طلبك مباشرة عبر واتساب', en: 'Add items to your cart and send your order straight via WhatsApp' },
  ctaTitle: { ar: 'هل تبحث عن منتج معين؟', en: 'Looking for a specific product?' },
  ctaText: {
    ar: 'تواصل معنا الآن وسنساعدك في اختيار المنتج المناسب لك',
    en: 'Contact us now and we will help you choose the right product',
  },
  filterAll: { ar: 'الكل', en: 'All' },
  allProductsSub: { ar: 'تصفح جميع منتجاتنا بأسعارها الرسمية وأضفها للسلة', en: 'Browse all our products with official prices and add them to your cart' },
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
  waMessage: { ar: 'مرحباً، أرغب في طلب منتج:', en: 'Hello, I would like to order:' },
  waGeneral: { ar: 'مرحباً، أرغب في الاستفسار عن منتجات كانيلا ماكس', en: 'Hello, I would like to ask about CANELLA MAX products' },
  // Pricing & Cart keys
  currency: { ar: 'ر.ي', en: 'YER' },
  sku: { ar: 'رقم الصنف', en: 'SKU' },
  price: { ar: 'السعر', en: 'Price' },
  addToCart: { ar: 'أضف للسلة', en: 'Add to Cart' },
  inCart: { ar: 'في السلة', en: 'In Cart' },
  cartTitle: { ar: 'سلة الطلبات', en: 'Shopping Cart' },
  cartEmpty: { ar: 'سلة الطلبات فارغة حالياً', en: 'Your shopping cart is currently empty' },
  cartEmptySub: { ar: 'تصفح المنتجات وأضف ما يعجبك إلى السلة لطلبه بسهولة', en: 'Browse our products and add your favorites to order easily' },
  clearCart: { ar: 'تفريغ السلة', en: 'Clear Cart' },
  removeItem: { ar: 'حذف من السلة', en: 'Remove item' },
  totalItems: { ar: 'عدد القطع', en: 'Total Items' },
  totalAmount: { ar: 'الإجمالي الكلي', en: 'Grand Total' },
  customerInfo: { ar: 'بيانات التوصيل (اختياري)', en: 'Delivery Details (Optional)' },
  customerName: { ar: 'الاسم الكريم', en: 'Your Name' },
  customerPhone: { ar: 'رقم الهاتف', en: 'Phone Number' },
  customerAddress: { ar: 'العنوان أو ملاحظات الطلب', en: 'Address or Order Notes' },
  checkoutWhatsapp: { ar: 'إرسال الطلب عبر واتساب', en: 'Send Order via WhatsApp' },
  continueShopping: { ar: 'مواصلة التسوق', en: 'Continue Shopping' },
  searchPlaceholder: {
    ar: 'ابحث عن منتج، قسم، أو رقم صنف (مثال: واقي شمس، شامبو، فحم)...',
    en: 'Search by product name, category, or SKU (e.g. sunscreen, shampoo, charcoal)...',
  },
  searchShort: { ar: 'ابحث عن منتج...', en: 'Search products...' },
  searchResults: { ar: 'نتائج البحث', en: 'Search Results' },
  noSearchResults: { ar: 'لا توجد منتجات مطابقة لبحثك', en: 'No products match your search' },
  clearSearch: { ar: 'مسح البحث', en: 'Clear search' },
  // Store Categories & Best Sellers
  storeDepartments: { ar: 'التصنيفات', en: 'Categories' },
  storeDepartmentsSub: {
    ar: 'تصفح أقسام الصيدلية: أدوية وعلاجات، عناية بالبشرة، واقيات شمسية، شعر وأسنان',
    en: 'Browse pharmacy departments: medicines & treatments, skincare, sun care, hair & dental',
  },
  deptMedicines: { ar: 'أدوية وعلاجات', en: 'Medicines & Treatments' },
  deptMedicinesSub: { ar: 'علاجات جلدية وطبية متخصصة', en: 'Specialized dermatological & medical care' },
  deptSkincare: { ar: 'العناية بالبشرة', en: 'Skincare' },
  deptSkincareSub: { ar: 'كريمات ترطيب، غسول وأقنعة', en: 'Moisturizers, cleansers & masks' },
  deptSuncare: { ar: 'واقيات شمسية', en: 'Sun Care SPF 50' },
  deptSuncareSub: { ar: 'حماية فائقة لجميع أنواع البشرة', en: 'SPF 50 protection for all skin types' },
  deptHaircare: { ar: 'العناية بالشعر', en: 'Hair Care' },
  deptHaircareSub: { ar: 'شامبو وبلسم طبيعي مغذٍّ', en: 'Nourishing shampoos & conditioner' },
  deptDental: { ar: 'الفم والأسنان', en: 'Dental Care' },
  deptDentalSub: { ar: 'تبييض، حساسية، فحم وأطفال', en: 'Whitening, sensitivity, charcoal & kids' },
  deptBodyFoot: { ar: 'الجسم والقدمين', en: 'Body & Foot' },
  deptBodyFootSub: { ar: 'غسول لافندر وعلاج التشققات', en: 'Lavender wash & cracked heel repair' },
  deptPrescription: { ar: 'اطلب دواءك / وصفتك', en: 'Order Prescription' },
  deptPrescriptionSub: { ar: 'تواصل مع الصيدلي مباشرة', en: 'Chat directly with our pharmacist' },
  bestSellers: { ar: 'المنتجات الأكثر مبيعاً', en: 'Best-Selling Products' },
  bestSellersSub: {
    ar: 'الأصناف الأكثر طلباً وثقة لدى عملاء صيدلية كانيلا',
    en: 'Top-rated and most ordered products by Canella Pharmacy customers',
  },
  bestSellerBadge: { ar: 'الأكثر مبيعاً', en: 'Best Seller' },
  tabAll: { ar: 'الكل', en: 'All' },
  tabTreatments: { ar: 'أدوية وعلاجات', en: 'Medicines & Repair' },
  tabSkinSun: { ar: 'بشرة وواقي شمس', en: 'Skincare & Sun' },
  tabHairBody: { ar: 'شعر وجسم', en: 'Hair & Body' },
  tabDental: { ar: 'الفم والأسنان', en: 'Dental Care' },
  rxBannerTitle: { ar: 'هل تبحث عن دواء معين أو لديك وصفة طبية؟', en: 'Looking for a medicine or have a prescription?' },
  rxBannerSub: {
    ar: 'أرسل اسم الدواء أو صورة الوصفة الطبية عبر واتساب وسنقوم بتجهيزها لك فوراً',
    en: 'Send the medicine name or prescription photo via WhatsApp and we will prepare it right away',
  },
  rxBannerBtn: { ar: 'اطلب دواءك عبر واتساب', en: 'Order Medicine via WhatsApp' },
  waPrescriptionMsg: {
    ar: 'مرحباً صيدلية كانيلا، أرغب في الاستفسار عن دواء / إرسال وصفة طبية:',
    en: 'Hello Canella Pharmacy, I would like to inquire about a medicine / send a prescription:',
  },
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

  /** Format a price with thousand separators and current currency label. */
  formatPrice(amount: number): string {
    return `${amount.toLocaleString('en-US')} ${this.t('currency')}`;
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
