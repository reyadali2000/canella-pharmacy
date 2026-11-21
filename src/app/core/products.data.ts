import { L } from './i18n.service';

export interface Product {
  id: string;
  sku: string;
  price: number;
  categorySlug: string;
  image: string;
  name: L;
  subtitle: L;
  size?: string;
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: L;
  description: L;
  icon: string;
  coverImage: string;
  accent: string;
  products: Product[];
}

export interface SlideItem {
  id: string;
  image: string;
  badge: L;
  title: L;
  subtitle: L;
  linkSlug?: string;
}

export const CONTACT = {
  phone: '+967 776 186 317',
  phoneHref: '+967776186317',
  whatsappInt: '967776186317',
  instagram: 'https://www.instagram.com/canellamax_co/',
  facebook: 'https://www.facebook.com/share/1FRUbV87WK/?mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@canellamax.yemen',
};

export const SLIDES: SlideItem[] = [
  {
    id: 's1',
    image: 'images/slider/1795207657501.jpg',
    badge: { ar: 'تشكيلة كانيلا ماكس الفاخرة', en: 'CANELLA MAX Luxury Collection' },
    title: { ar: 'العناية الطبيعية المتكاملة لبشرتك', en: 'Complete Natural Skincare' },
    subtitle: {
      ar: 'كريمات مرطبة فاخرة بزيت الأرغان والجوجوبا والأفوكادو وخلاصة الصبار وفيتامين E',
      en: 'Rich moisturizing creams infused with Argan, Jojoba, Avocado oils, Aloe Vera & Vitamin E',
    },
    linkSlug: 'skin-creams',
  },
  {
    id: 's2',
    image: 'images/slider/1795207657570.jpg',
    badge: { ar: 'واقي شمس SPF 50 • للبشرة الجافة', en: 'Sunscreen SPF 50 • Dry Skin' },
    title: { ar: 'حماية فائقة في كل الفصول', en: 'Superior Sun Protection All Year' },
    subtitle: {
      ar: 'واقي شمس كانيلا ماكس بلون بيج طبيعي مع فيتامين E و B5 لترطيب وحماية يومية من UVA/UVB',
      en: 'Natural Beige SPF 50 PA+++ with Vitamins E & B5 for daily hydration and UVA/UVB defense',
    },
    linkSlug: 'skin-creams',
  },
  {
    id: 's3',
    image: 'images/slider/1795207657578.jpg',
    badge: { ar: 'واقي شمس SPF 50 • للبشرة الدهنية والمختلطة', en: 'Sunscreen SPF 50 • Oily & Combination Skin' },
    title: { ar: 'إطلالة مشرقة بدون لمعان', en: 'Radiant Look, Zero Shine' },
    subtitle: {
      ar: 'تركيبة خفيفة بلون بيج فاتح تتحكم بالزيوت وتحمي بشرتك طوال اليوم',
      en: 'Lightweight Light Beige formula that controls oil and protects your skin all day',
    },
    linkSlug: 'skin-creams',
  },
  {
    id: 's4',
    image: 'images/slider/1795207657584.jpg',
    badge: { ar: 'واقي شمس SPF 50 • شفاف لجميع أنواع البشرة', en: 'Sunscreen SPF 50 • Colorless for All Skin Types' },
    title: { ar: 'حماية خفية، أناقة يومية', en: 'Invisible Shield, Everyday Elegance' },
    subtitle: {
      ar: 'واقي شمس شفاف بدون لون غني بفيتامين E و B5 مناسب لجميع أنواع البشرة',
      en: 'Colorless daily sunscreen enriched with Vitamins E & B5 for every skin type',
    },
    linkSlug: 'skin-creams',
  },
  {
    id: 's5',
    image: 'images/slider/1795207657594.jpg',
    badge: { ar: 'واقي شمس SPF 50 • بيج فاتح للبشرة الجافة', en: 'Sunscreen SPF 50 • Light Beige for Dry Skin' },
    title: { ar: 'دفء العناية ونعومة الحماية', en: 'Warm Care & Silky Protection' },
    subtitle: {
      ar: 'تغطية ناعمة بلون بيج فاتح مع ترطيب عميق وحماية PA+++ من أشعة الشمس',
      en: 'Soft Light Beige coverage with deep moisturizing care and PA+++ sun defense',
    },
    linkSlug: 'skin-creams',
  },
  {
    id: 's6',
    image: 'images/slider/1795207657601.jpg',
    badge: { ar: 'CANELLA MAX • العناية اليومية', en: 'CANELLA MAX • Daily Care' },
    title: { ar: 'رفيقك اليومي لبشرة صحية ومحمية', en: 'Your Daily Companion for Healthy Skin' },
    subtitle: {
      ar: 'منتجات مصممة بمعايير عالمية لتمنحك الثقة والجمال الطبيعي كل يوم',
      en: 'Formulated to international standards for natural confidence and beauty every day',
    },
    linkSlug: 'skin-creams',
  },
];

export const CATEGORIES: Category[] = [
  {
    slug: 'skin-creams',
    name: { ar: 'كريمات للبشرة', en: 'Skin Creams' },
    description: {
      ar: 'كريمات ترطيب وعلاج البشرة وواقيات الشمس وكريم BB بتركيبات طبيعية وفيتامينات مغذية',
      en: 'Moisturizing & repair creams, SPF 50 sunscreens, and BB cream with natural oils and vitamins',
    },
    icon: 'jar',
    coverImage: 'images/skin-creams/1795207657241.jpg',
    accent: '#7b2fa8',
    products: [
      {
        id: 'sc-1',
        sku: '11109-06-006',
        price: 3000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657241.jpg',
        name: { ar: 'كريم كانيلا لعلاج الإكزيما والتهيج الجلدي', en: 'Canella Eczema Relief Skin Repair Cream' },
        subtitle: {
          ar: 'بالسيراميدات واليوريا وزبدة الشيا، يخفف الحكة والاحمرار ويرمم حاجز البشرة',
          en: 'With Ceramides, Urea & Shea Butter; relieves itching, redness & restores skin barrier',
        },
        size: '75 ml',
        featured: true,
      },
      {
        id: 'sc-2',
        sku: '11109-05-001',
        price: 4500,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657290.jpg',
        name: {
          ar: 'واقي شمس كانيلا ماكس SPF 50 بيج طبيعي (للبشرة الجافة)',
          en: 'Canella Max Sunscreen Cream SPF 50 – Natural Beige (Dry Skin)',
        },
        subtitle: {
          ar: 'واقي شمس ملوّن بفيتامين E و B5 لحماية وترطيب البشرة الجافة من أشعة UVA/UVB',
          en: 'Tinted UVA/UVB PA++ sunscreen with Vitamins E & B5 for dry skin',
        },
        size: '50 ml',
        featured: true,
      },
      {
        id: 'sc-3',
        sku: '11109-06-007',
        price: 4000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657303.jpg',
        name: { ar: 'بي بي كريم SPF 30 (كريم أساس وخافي عيوب ومغذي)', en: 'Canella Max BB Cream SPF 30' },
        subtitle: {
          ar: 'تغطية خفيفة وتوحيد للون البشرة مع ترطيب وحماية من الشمس للبشرة العادية والدهنية',
          en: 'Light coverage, hydration & UVA/UVB protection for normal to oily skin',
        },
        size: '50 ml',
        featured: true,
      },
      {
        id: 'sc-4',
        sku: '11109-05-004',
        price: 4500,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657308.jpg',
        name: {
          ar: 'واقي شمس كانيلا ماكس SPF 50 بيج فاتح (للبشرة الدهنية والمختلطة)',
          en: 'Canella Max Sunscreen Cream SPF 50 – Light Beige (Oily & Combination Skin)',
        },
        subtitle: {
          ar: 'واقي شمس مطفي يتحكم بالزيوت واللمعان ويحمي من أشعة UVA/UVB',
          en: 'Mattifying tinted sunscreen with Zinc Oxide & Titanium Dioxide for oil control',
        },
        size: '50 ml',
      },
      {
        id: 'sc-5',
        sku: '11109-05-003',
        price: 4500,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657333.jpg',
        name: {
          ar: 'واقي شمس كانيلا ماكس SPF 50 بيج فاتح (للبشرة الجافة)',
          en: 'Canella Max Sunscreen Cream SPF 50 – Light Beige (Dry Skin)',
        },
        subtitle: {
          ar: 'واقي ملوّن PA+++ بفيتامين E و B5 يرطب بعمق ويحمي البشرة الجافة والحساسة',
          en: 'Tinted UVA/UVB PA+++ sunscreen with Vitamins E & B5 for long-lasting hydration',
        },
        size: '50 ml',
      },
      {
        id: 'sc-6',
        sku: '11109-06-001',
        price: 3000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657339.jpg',
        name: {
          ar: 'كريم ترطيب لليدين والوجه (للبشرة الدهنية والمختلطة)',
          en: 'Canella Max Moisturizing Hand & Face Cream (Oily & Combination Skin)',
        },
        subtitle: {
          ar: 'ترطيب خفيف غير دهني يوازن الزيوت بخلاصات عشبية وزيوت طبيعية',
          en: 'Lightweight non-greasy hydration that balances oils with herbal & botanical extracts',
        },
        size: '75 ml',
      },
      {
        id: 'sc-7',
        sku: '11109-06-003',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657381.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بزيت الجوجوبا',
          en: 'Canella Max Hand & Face Moisturizing Cream – Jojoba Oil',
        },
        subtitle: {
          ar: 'ترطيب عميق طويل الأمد بزيت الجوجوبا وفيتامين E لجميع أنواع البشرة',
          en: 'Deep long-lasting hydration with Jojoba Oil & Vitamin E for all skin types',
        },
        size: '200 ml',
        featured: true,
      },
      {
        id: 'sc-8',
        sku: '11109-06-001',
        price: 3000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657386.jpg',
        name: {
          ar: 'كريم ترطيب لليدين والوجه (للبشرة الجافة والحساسة)',
          en: 'Canella Max Moisturizing Hand & Face Cream (Dry & Sensitive Skin)',
        },
        subtitle: {
          ar: 'ترطيب نباتي عميق بزبدة الشيا وزيت اللوز يزيل الجفاف والخشونة',
          en: 'Deep botanical hydration with Shea Butter & Almond Oil to relieve dryness',
        },
        size: '75 ml',
      },
      {
        id: 'sc-9',
        sku: '11109-05-004',
        price: 4500,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657397.jpg',
        name: {
          ar: 'واقي شمس كانيلا ماكس SPF 50 مقاوم للماء (بيج فاتح – للبشرة الدهنية)',
          en: 'Canella Max Water-Resistant Sunscreen SPF 50 – Light Beige',
        },
        subtitle: {
          ar: 'واقي مطفي مقاوم للماء يتحكم بالإفرازات الدهنية ويمنع ظهور حب الشباب',
          en: 'Mattifying water-resistant tinted sunscreen that controls oil & helps prevent acne',
        },
        size: '50 ml',
      },
      {
        id: 'sc-10',
        sku: '11109-06-005',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657405.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بالأفوكادو',
          en: 'Canella Max Hand & Face Moisturizing Cream – Avocado Oil',
        },
        subtitle: {
          ar: 'ترطيب مغذٍّ وعميق بزيت الأفوكادو وفيتامين E لجميع أنواع البشرة',
          en: 'Deep nourishing hydration with Avocado Oil & Vitamin E for all skin types',
        },
        size: '200 ml',
      },
      {
        id: 'sc-11',
        sku: '11109-06-004',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657433.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بزيت الأرغان',
          en: 'Canella Max Hand & Face Moisturizing Cream – Argan Oil',
        },
        subtitle: {
          ar: 'ترطيب طويل الأمد ومقاوم لعلامات التقدم بالسن بزيت الأرغان وفيتامين E',
          en: 'Long-lasting anti-aging hydration with Argan Oil & Vitamin E',
        },
        size: '200 ml',
      },
      {
        id: 'sc-12',
        sku: '11109-06-003',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657514.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بزيت الجوجوبا – عناية متكاملة',
          en: 'Canella Max Jojoba Oil Moisturizing Cream – Complete Care',
        },
        subtitle: {
          ar: 'نعومة فائقة وترطيب متوازن لليدين والوجه بخلاصة الجوجوبا وفيتامين E',
          en: 'Silky softness & balanced hydration for hands and face with Jojoba & Vitamin E',
        },
        size: '200 ml',
      },
      {
        id: 'sc-13',
        sku: '11109-06-003',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657526.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بزيت الجوجوبا السريع الامتصاص',
          en: 'Canella Max Fast-Absorbing Jojoba Moisturizing Cream',
        },
        subtitle: {
          ar: 'مرطب سريع الامتصاص غني بزيت الجوجوبا وفيتامين E والزنك',
          en: 'Fast-absorbing moisturizer enriched with Jojoba Oil, Vitamin E & Zinc',
        },
        size: '200 ml',
      },
      {
        id: 'sc-14',
        sku: '11109-06-002',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657549.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بالألوفيرا (صبار)',
          en: 'Canella Max Hand & Face Moisturizing Cream – Aloe Vera',
        },
        subtitle: {
          ar: 'ترطيب عميق ومهدئ للبشرة بخلاصة الألوفيرا الطبيعية وفيتامين E',
          en: 'Soothing deep hydration with natural Aloe Vera extract & Vitamin E',
        },
        size: '200 ml',
      },
      {
        id: 'sc-15',
        sku: '11109-06-004',
        price: 1000,
        categorySlug: 'skin-creams',
        image: 'images/skin-creams/1795207657557.jpg',
        name: {
          ar: 'كريم ترطيب اليدين والوجه بزيت الأرغان المغربي',
          en: 'Canella Max Luxury Argan Oil Hand & Face Cream',
        },
        subtitle: {
          ar: 'يغذي البشرة ويجدد حيويتها بفضل زيت الأرغان النقي وفيتامين E',
          en: 'Nourishes & revitalizes skin with pure Argan Oil and Vitamin E',
        },
        size: '200 ml',
      },
    ],
  },
  {
    slug: 'toothpaste',
    name: { ar: 'معجون أسنان', en: 'Toothpaste' },
    description: {
      ar: 'معاجين أسنان متخصصة للتبييض، الأسنان الحساسة، الفحم النشط، الأعشاب، الحشوات، ومعاجين آمنة للأطفال',
      en: 'Specialized toothpastes for whitening, sensitivity, activated charcoal, herbal care, veneers & kids',
    },
    icon: 'tooth',
    coverImage: 'images/toothpaste/1795207657344.jpg',
    accent: '#0e8a8a',
    products: [
      {
        id: 'tp-1',
        sku: '11109-07-002',
        price: 1500,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657344.jpg',
        name: { ar: 'معجون أسنان بالفحم النشط 100 جم', en: 'Canella Max Activated Charcoal Toothpaste' },
        subtitle: {
          ar: 'فحم نشط لتنظيف عميق وتبييض طبيعي ومكافحة البلاك ونفس منعش',
          en: 'Activated charcoal for deep cleaning, natural whitening, anti-plaque & fresh breath',
        },
        size: '100 g',
        featured: true,
      },
      {
        id: 'tp-2',
        sku: '11109-07-005',
        price: 1800,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657263.jpg',
        name: { ar: 'معجون أسنان مبيض (تبييض مكثف) 100 جم', en: 'Canella Max Intensive Whitening Toothpaste' },
        subtitle: {
          ar: 'يبيض الأسنان ويزيل التصبغات والبقع ويمنع الجير بخلاصة النعناع المنعش',
          en: 'Whitens teeth, removes stains & fights plaque with refreshing mint extract',
        },
        size: '100 g',
        featured: true,
      },
      {
        id: 'tp-3',
        sku: '11109-07-004',
        price: 2000,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657375.jpg',
        name: { ar: 'معجون أسنان للأسنان الحساسة وتبييضها 100 جم', en: 'Canella Max Sensitive & Whitening Toothpaste' },
        subtitle: {
          ar: 'يخفف حساسية الأسنان ويحمي اللثة ويكافح التسوس بنكهة النعناع',
          en: 'Relieves tooth sensitivity, protects gums & prevents cavities with fresh mint',
        },
        size: '100 g',
      },
      {
        id: 'tp-4',
        sku: '11109-07-001',
        price: 1500,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657274.jpg',
        name: {
          ar: 'معجون أسنان عشبي لإنعاش النفس (أوراق البابايا والجوافة)',
          en: 'Canella Max Herbal Fresh Breath Toothpaste (Papaya & Guava Leaf)',
        },
        subtitle: {
          ar: 'تركيبة عشبية طبيعية لعناية كاملة بالأسنان واللثة ومقاومة البلاك',
          en: 'Natural herbal formula for complete teeth and gum care & anti-plaque protection',
        },
        size: '100 g',
      },
      {
        id: 'tp-5',
        sku: '11109-07-003',
        price: 1800,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657351.jpg',
        name: {
          ar: 'معجون أسنان خاص بالفينير والحشوات وأصحاب التقويم',
          en: 'Canella Max Dental Veneer, Composite & Orthodontics Toothpaste',
        },
        subtitle: {
          ar: 'خالٍ من SLS والمواد الكاشطة، آمن على الفينير والحشوات بنكهة الأناناس والنعناع',
          en: 'SLS-free, non-abrasive care for veneers & composite fillings with pineapple-mint flavor',
        },
        size: '100 g',
      },
      {
        id: 'tp-6',
        sku: '11109-07-006',
        price: 1500,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657446.jpg',
        name: { ar: 'معجون أسنان للعناية اليومية خالي من الفلورايد', en: 'Canella Max Fluoride-Free Daily Care Toothpaste' },
        subtitle: {
          ar: 'عناية يومية متكاملة للأسنان واللثة خالية من الفلورايد بمستخلصات طبيعية',
          en: 'Fluoride-free daily protection for healthy gums and teeth with natural extracts',
        },
        size: '100 g',
      },
      {
        id: 'tp-7',
        sku: '11109-07-007',
        price: 500,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657247.jpg',
        name: { ar: 'معجون أسنان للأطفال بنكهة الموز', en: 'Canella Max Kids Toothpaste – Banana' },
        subtitle: {
          ar: 'خالٍ من الفلورايد و SLS، آمن عند البلع، مخصص للأطفال من 2 إلى 6 سنوات',
          en: 'Fluoride-free & SLS-free kids toothpaste, safe if swallowed, ages 2–6',
        },
        size: '60 g',
      },
      {
        id: 'tp-8',
        sku: '11109-07-007',
        price: 500,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657415.jpg',
        name: { ar: 'معجون أسنان للأطفال بنكهة الفراولة', en: 'Canella Max Kids Toothpaste – Strawberry' },
        subtitle: {
          ar: 'بطعم الفراولة الطبيعي، خالٍ من الفلورايد و SLS وآمن للأطفال من 2 إلى 6 سنوات',
          en: 'Natural strawberry kids toothpaste, fluoride & SLS free, safe if swallowed, ages 2–6',
        },
        size: '60 g',
      },
      {
        id: 'tp-9',
        sku: '11109-07-007',
        price: 1000,
        categorySlug: 'toothpaste',
        image: 'images/toothpaste/1795207657328.jpg',
        name: {
          ar: 'مجموعة معجون أسنان الأطفال (عبوتان: فراولة + موز)',
          en: 'Canella Max Kids Toothpaste Duo (2 pcs: Strawberry & Banana)',
        },
        subtitle: {
          ar: 'ثنائي نكهات الفواكه الطبيعية المحببة للأطفال، خالٍ من الفلورايد و SLS',
          en: 'Kids toothpaste duo with natural fruit flavors, fluoride-free & SLS-free',
        },
        size: '2 × 60 g',
      },
    ],
  },
  {
    slug: 'shampoo',
    name: { ar: 'شامبو', en: 'Shampoo' },
    description: {
      ar: 'شامبو كانيلا ماكس بخلاصة القرفة والشاي الأخضر، جنين القمح، وزيت شجرة الشاي لمكافحة القشرة وتقوية الشعر',
      en: 'CANELLA MAX shampoos with Cinnamon & Green Tea, Wheat Germ, and Tea Tree Oil for anti-dandruff & strong hair',
    },
    icon: 'bottle',
    coverImage: 'images/shampoo/1795207657295.jpg',
    accent: '#8a5a14',
    products: [
      {
        id: 'sh-1',
        sku: '11109-01-003',
        price: 1200,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657252.jpg',
        name: {
          ar: 'شامبو القرفة والشاي الأخضر منوع',
          en: 'Canella Max Cinnamon & Green Tea Shampoo',
        },
        subtitle: {
          ar: 'تغذية طبيعية وتقوية للشعر ودعم لصحة فروة الرأس – متوفر للشعر العادي والجاف',
          en: 'Natural nourishment & antioxidant care for normal and dry hair',
        },
        size: '330 g',
        featured: true,
      },
      {
        id: 'sh-2',
        sku: '11109-01-001',
        price: 900,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657295.jpg',
        name: {
          ar: 'شامبو جنين القمح منوع لتغذية وإصلاح الشعر',
          en: 'Canella Max Wheat Germ Repair & Nourish Shampoo',
        },
        subtitle: {
          ar: 'غني بالبروتينات وفيتامينات E و B وأوميغا 3 لإصلاح الشعر الضعيف وتقليل التساقط',
          en: 'Rich in proteins, Vitamins E & B and Omega-3 to repair weak hair & reduce hair fall',
        },
        size: '220 g',
        featured: true,
      },
      {
        id: 'sh-3',
        sku: '11109-01-002',
        price: 900,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657316.jpg',
        name: {
          ar: 'شامبو عشبي مضاد للقشرة بزيت شجرة الشاي',
          en: 'Canella Max Herbal Anti-Dandruff Shampoo with Tea Tree Oil',
        },
        subtitle: {
          ar: 'يزيل القشرة بفعالية ويهدئ الحكة والالتهابات ويوازن إفراز الدهون في فروة الرأس',
          en: 'Eliminates dandruff, soothes scalp itching & controls excess oil for all hair types',
        },
        size: '220 g',
        featured: true,
      },
      {
        id: 'sh-4',
        sku: '11109-01-001',
        price: 900,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657323.jpg',
        name: {
          ar: 'شامبو جنين القمح (للشعر الجاف والعادي والدهني)',
          en: 'Canella Max Wheat Germ Shampoo (Dry, Normal & Greasy Hair)',
        },
        subtitle: {
          ar: 'تركيبات مخصصة لكل نوع شعر بخلاصة جنين القمح الطبيعي والكيراتين',
          en: 'Tailored formulas for dry, normal and oily hair with natural Wheat Germ extract',
        },
        size: '220 g',
      },
      {
        id: 'sh-5',
        sku: '11109-01-003',
        price: 1200,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657473.jpg',
        name: {
          ar: 'شامبو القرفة والشاي الأخضر – لمعان وحيوية',
          en: 'Canella Max Cinnamon & Green Tea Revitalizing Shampoo',
        },
        subtitle: {
          ar: 'تنظيف لطيف وترطيب متوازن يحمي الشعر من التقصف والعوامل الضارة',
          en: 'Gentle cleansing & balanced moisture that protects hair from split ends',
        },
        size: '330 g',
      },
      {
        id: 'sh-6',
        sku: '11109-01-002',
        price: 900,
        categorySlug: 'shampoo',
        image: 'images/shampoo/1795207657486.jpg',
        name: {
          ar: 'شامبو عشبي مضاد للقشرة بزيت شجرة الشاي والصبار',
          en: 'Canella Max Tea Tree, Aloe & Wheat Anti-Dandruff Shampoo',
        },
        subtitle: {
          ar: 'مضاد للبكتيريا والفطريات، يقوي الجذور ويمنح فروة الرأس نظافة وانتعاشاً يدوم',
          en: 'Antibacterial & antifungal formula that strengthens roots and refreshes the scalp',
        },
        size: '220 g',
      },
    ],
  },
  {
    slug: 'face-masks',
    name: { ar: 'أقنعة وجه', en: 'Face Masks' },
    description: {
      ar: 'أقنعة الفحم الأسود المقشرة وأقنعة الطين بالرمان وفيتامين E لتنظيف المسام بعمق وإزالة الرؤوس السوداء',
      en: 'Black charcoal peel-off masks and pomegranate clay detox masks for deep pore cleansing',
    },
    icon: 'mask',
    coverImage: 'images/face-masks/1795207657282.jpg',
    accent: '#b02a5b',
    products: [
      {
        id: 'fm-1',
        sku: '11109-03-001',
        price: 2000,
        categorySlug: 'face-masks',
        image: 'images/face-masks/1795207657269.jpg',
        name: {
          ar: 'القناع الأسود المقشر بالفحم الطبيعي',
          en: 'Canella Max Black Peel-Off Mask with Natural Charcoal',
        },
        subtitle: {
          ar: 'ينظف المسام بعمق ويزيل الرؤوس السوداء والشوائب ويشد البشرة',
          en: 'Deep pore cleansing charcoal peel-off mask that removes blackheads & tightens pores',
        },
        size: '75 ml',
        featured: true,
      },
      {
        id: 'fm-2',
        sku: '11109-03-002',
        price: 5000,
        categorySlug: 'face-masks',
        image: 'images/face-masks/1795207657282.jpg',
        name: {
          ar: 'قناع الطين لإزالة السموم وتنقية البشرة بالرمان وفيتامين E',
          en: 'Canella Max Cleansing Clay Detox Mask – Pomegranate & Vitamin E',
        },
        subtitle: {
          ar: 'قناع طين ديتوكس لتنظيف عميق والتحكم بالدهون، خالٍ من الكبريتات والبارابين',
          en: 'Clay detox mask for deep cleansing & oil control, sulfate and paraben free',
        },
        size: '150 g',
        featured: true,
      },
      {
        id: 'fm-3',
        sku: '11109-03-001',
        price: 2000,
        categorySlug: 'face-masks',
        image: 'images/face-masks/1795207657358.jpg',
        name: {
          ar: 'القناع الأسود المقشر بالفحم والطين لجميع أنواع البشرة',
          en: 'Canella Max Charcoal & Clay Black Peel-Off Mask',
        },
        subtitle: {
          ar: 'تركيبة الفحم الطبيعي والطين لإزالة الخلايا الميتة والرؤوس السوداء',
          en: 'Natural charcoal & clay formula to remove dead skin cells and blackheads',
        },
        size: '75 ml',
      },
    ],
  },
  {
    slug: 'hair-conditioner',
    name: { ar: 'بلسم للشعر', en: 'Hair Conditioner' },
    description: {
      ar: 'بلسم كانيلا ماكس الحريري بخلاصة ماء الورد، خالٍ من الكبريتات والبارابين لترطيب وفك تشابك الشعر',
      en: 'Silky Smooth Rose Water Conditioner, sulfate & paraben free for deep hydration and detangling',
    },
    icon: 'drop',
    coverImage: 'images/hair-conditioner/1795207657563.jpg',
    accent: '#d63f7c',
    products: [
      {
        id: 'hc-1',
        sku: '11109-01-005',
        price: 2500,
        categorySlug: 'hair-conditioner',
        image: 'images/hair-conditioner/1795207657563.jpg',
        name: {
          ar: 'بلسم الشعر بماء الورد (Silky Smooth)',
          en: 'Canella Max Silky Smooth Hair Conditioner – Rose Water',
        },
        subtitle: {
          ar: 'خالٍ من الكبريتات والبارابين، يرطب بعمق ويفك التشابك ويعالج الشعر الجاف والمتقصف',
          en: 'Sulfate & paraben free conditioner for dry, damaged & frizzy hair with Rose Water',
        },
        size: '200 g',
        featured: true,
      },
    ],
  },
  {
    slug: 'body-wash',
    name: { ar: 'شامبو جسم', en: 'Body Wash' },
    description: {
      ar: 'غسول استحمام عشبي للجسم برائحة اللافندر ومستخلصات البابونج والصبار والأوكالبتوس والشاي الأخضر',
      en: 'Herbal Lavender Body Wash with Chamomile, Aloe Vera, Eucalyptus & Green Tea extracts',
    },
    icon: 'pump',
    coverImage: 'images/body-wash/1795207657363.jpg',
    accent: '#6a41b8',
    products: [
      {
        id: 'bw-1',
        sku: '11109-01-004',
        price: 1200,
        categorySlug: 'body-wash',
        image: 'images/body-wash/1795207657363.jpg',
        name: {
          ar: 'غسول جسم عشبي باللافندر من كانيلا ماكس',
          en: 'Canella Max Herbal Lavender Body Wash',
        },
        subtitle: {
          ar: 'تنظيف لطيف وترطيب عميق وانتعاش يدوم بخلاصة اللافندر والبابونج والصبار والشاي الأخضر',
          en: 'Gentle cleansing & lasting freshness with Lavender, Chamomile, Aloe Vera & Eucalyptus',
        },
        size: '330 g',
        featured: true,
      },
    ],
  },
  {
    slug: 'face-wash',
    name: { ar: 'غسول وجه', en: 'Face Wash' },
    description: {
      ar: 'رغوة منظفة للوجه بفرشاة سيليكون مدمجة وزيت شجرة الشاي والصبار وفيتامين C للبشرة الدهنية والمختلطة',
      en: 'Foaming Facial Cleanser with built-in brush, Tea Tree Oil, Aloe Vera & Vitamin C',
    },
    icon: 'tube',
    coverImage: 'images/face-wash/1795207657461.jpg',
    accent: '#c47d16',
    products: [
      {
        id: 'fw-1',
        sku: '11109-02-002',
        price: 2500,
        categorySlug: 'face-wash',
        image: 'images/face-wash/1795207657461.jpg',
        name: {
          ar: 'رغوة منظفة للوجه للبشرة الدهنية والمختلطة',
          en: 'Canella Max Foaming Facial Cleanser – Oily & Combination Skin',
        },
        subtitle: {
          ar: 'ينظف المسام بعمق ويمنع حب الشباب ويوازن الزيوت بزيت شجرة الشاي والصبار وفيتامين C',
          en: 'Deep pore cleansing for oily & combination skin with Tea Tree Oil, Aloe Vera & Vitamin C',
        },
        size: '150 ml',
        featured: true,
      },
    ],
  },
  {
    slug: 'foot-cream',
    name: { ar: 'كريم علاج تشقق الأقدام', en: 'Foot Crack Repair Cream' },
    description: {
      ar: 'كريم العناية بالقدمين لإزالة تشققات الكعبين وترطيبها بعمق بزيت الأرغان وشمع العسل وزبدة الشيا',
      en: 'Deep repair cracked heel cream with Argan Oil, Beeswax, Shea Butter & Lactic Acid',
    },
    icon: 'foot',
    coverImage: 'images/foot-cream/1795207657368.jpg',
    accent: '#a82846',
    products: [
      {
        id: 'fc-1',
        sku: '11109-04-001',
        price: 2000,
        categorySlug: 'foot-cream',
        image: 'images/foot-cream/1795207657368.jpg',
        name: {
          ar: 'كريم العناية بالقدمين وعلاج التشققات',
          en: 'Canella Max Cracked Heel Foot Care Cream',
        },
        subtitle: {
          ar: 'يزيل التشققات ويقشر الجلد الميت ويرطب بعمق بزيت الأرغان وشمع العسل وزبدة الشيا – مناسب لمرضى السكري',
          en: 'Repairs cracked heels, exfoliates dead skin & deeply moisturizes with Argan Oil, Beeswax & Shea Butter',
        },
        size: '75 ml',
        featured: true,
      },
    ],
  },
];
