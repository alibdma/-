import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'switches', name: 'المفاتيح والأفياش', icon: 'Zap' },
  { id: 'solar', name: 'الطاقة الشمسية', icon: 'Sun' },
  { id: 'timers', name: 'مؤقتات', icon: 'Clock' },
  { id: 'lighting', name: 'الإضاءة', icon: 'Lightbulb' },
  { id: 'breakers', name: 'قواطع كهربائية', icon: 'ShieldAlert' },
  { id: 'industrial', name: 'تحكم صناعي', icon: 'Settings' },
  { id: 'panels', name: 'طبلونات وصناديق', icon: 'Box' },
  { id: 'cables', name: 'كابلات', icon: 'Activity' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'لوح طاقة شمسية 450 واط',
    price: 1200,
    image: 'https://picsum.photos/seed/solar1/400/400',
    category: 'solar',
    description: 'لوح طاقة شمسية عالي الكفاءة بتقنية مونو كريستالين.',
    rating: 4.5,
    reviewCount: 12,
    reviews: [
      { id: 'r1', userName: 'خالد', rating: 5, comment: 'منتج رائع وسهل التركيب', date: '2024-03-01' },
      { id: 'r2', userName: 'سارة', rating: 4, comment: 'جيد جداً ولكن يحتاج تطبيق خاص', date: '2024-02-15' }
    ]
  },
  {
    id: '2',
    name: 'مفتاح إنارة ذكي واي فاي',
    price: 85,
    image: 'https://picsum.photos/seed/switch1/400/400',
    category: 'switches',
    description: 'مفتاح إنارة ذكي يمكن التحكم به عبر الهاتف.',
    rating: 4.8,
    reviewCount: 25,
    reviews: [
      { id: 'r3', userName: 'فهد', rating: 5, comment: 'إضاءة قوية جداً وتدوم طويلاً', date: '2024-03-05' }
    ]
  },
  {
    id: '3',
    name: 'قاطع كهربائي 32 أمبير',
    price: 45,
    image: 'https://picsum.photos/seed/breaker1/400/400',
    category: 'breakers',
    description: 'قاطع كهربائي لحماية الدوائر الكهربائية.',
    rating: 4.2,
    reviewCount: 8,
    reviews: []
  },
  {
    id: '4',
    name: 'كشاف ليد 50 واط خارجي',
    price: 120,
    image: 'https://picsum.photos/seed/light1/400/400',
    category: 'lighting',
    description: 'كشاف ليد موفر للطاقة ومقاوم للماء.',
    rating: 4.7,
    reviewCount: 40,
    reviews: []
  },
  {
    id: '5',
    name: 'مؤقت زمني ديجيتال',
    price: 65,
    image: 'https://picsum.photos/seed/timer1/400/400',
    category: 'timers',
    description: 'مؤقت زمني للتحكم في تشغيل الأجهزة.',
    rating: 4.9,
    reviewCount: 15,
    reviews: []
  },
  {
    id: '6',
    name: 'كونتاكتور صناعي 25 أمبير',
    price: 180,
    image: 'https://picsum.photos/seed/ind1/400/400',
    category: 'industrial',
    description: 'كونتاكتور للتحكم في المحركات الصناعية.',
    rating: 4.6,
    reviewCount: 20,
    reviews: []
  }
];
