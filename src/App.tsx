import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { 
  Search, 
  Home as HomeIcon, 
  Grid, 
  ShoppingCart, 
  ClipboardList, 
  User, 
  Zap, 
  Sun, 
  Clock, 
  Lightbulb, 
  ShieldAlert, 
  Settings, 
  Box, 
  Activity,
  Heart,
  Plus,
  Minus,
  Trash2,
  ChevronLeft,
  LogOut,
  Star,
  Bell,
  MapPin,
  Fingerprint,
  Languages,
  Moon,
  Coins,
  Share2,
  FileText,
  MessageSquare,
  ShoppingBag,
  ChevronDown,
  Globe,
  Palette,
  Wrench,
  Eye,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { CATEGORIES, PRODUCTS } from './constants';
import { View, Product, Category, Order, CartItem, UserRole } from './types';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    welcome_title: 'متجر الكهرباء الذكي',
    welcome_subtitle: 'حلول كهربائية متكاملة لمنزلك ومصنعك بأعلى جودة وأفضل الأسعار',
    enter_store: 'دخول المتجر',
    home: 'الرئيسية',
    categories: 'الفئات',
    cart: 'السلة',
    orders: 'الطلبات',
    profile: 'الحساب',
    search_placeholder: 'ابحث عن منتجات...',
    popular_categories: 'الفئات الشائعة',
    featured_products: 'منتجات مختارة',
    add_to_cart: 'أضف للسلة',
    subtotal: 'المجموع الفرعي',
    shipping: 'تكلفة الشحن',
    total: 'الإجمالي',
    checkout: 'إتمام الطلب',
    shipping_info: 'معلومات الشحن',
    address: 'العنوان',
    city: 'المدينة',
    postal_code: 'الرمز البريدي',
    get_location: 'تحديد موقعي',
    locating: 'جاري التحديد...',
    coordinates_success: 'تم تحديد الإحداثيات بنجاح',
    view_on_maps: 'عرض الموقع على خرائط جوجل',
    empty_cart: 'سلتك فارغة حالياً',
    start_shopping: 'ابدأ التسوق الآن',
    my_orders: 'طلباتي',
    order_id: 'رقم الطلب',
    date: 'التاريخ',
    status: 'الحالة',
    edit_profile: 'تعديل الملف الشخصي',
    favorites: 'المفضلة',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    fingerprint: 'تفعيل البصمة',
    language: 'اللغة',
    appearance: 'المظهر',
    currency: 'العملة',
    contact_us: 'تواصل معنا',
    share_app: 'مشاركة التطبيق',
    terms: 'الشروط والأحكام',
    privacy: 'سياسة الخصوصية',
    save_changes: 'حفظ التغييرات',
    payment_method: 'طريقة الدفع',
    amount_required: 'المبلغ المطلوب',
    transaction_id: 'رقم الحوالة أو الإيداع',
    additional_notes: 'ملاحظات إضافية',
    payment_instruction: 'يرجى إتمام الحوالة البنكية أولاً، ثم إدخال رقم العملية في المربع أعلاه ليتمكن مدير التطبيق من مراجعة طلبك وتأكيده.',
    confirm_order: 'تأكيد وإرسال الطلب',
    order_success: 'تم إرسال طلبك بنجاح',
    review_notice: 'سيتم مراجعة الحوالة من قبل المدير.',
    order_items: 'محتويات الطلب',
    all: 'الكل',
    pending: 'قيد الانتظار',
    shipping_status: 'جاري الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
    details: 'التفاصيل',
    product_details: 'تفاصيل المنتج',
    reviews: 'تقييمات',
    add_your_review: 'أضف تقييمك',
    write_your_opinion: 'اكتب رأيك هنا...',
    publish_review: 'نشر التقييم',
    customer_reviews: 'تقييمات العملاء',
    no_reviews: 'لا توجد تقييمات بعد',
    no_orders: 'لا توجد طلبات',
    no_orders_desc: 'لم تقم بإجراء أي طلبات بعد. ابدأ بالتسوق الآن واكتشف منتجاتنا الرائعة!',
    you: 'أنت',
    cart_empty: 'سلتك فارغة حالياً',
    browser_no_geo: 'متصفحك لا يدعم تحديد الموقع',
    geo_error: 'تعذر تحديد الموقع. يرجى التأكد من تفعيل إذن الوصول للموقع.',
    address_placeholder: 'مثال: حي النرجس، شارع الملك فهد',
    favorites_empty: 'قائمة المفضلة فارغة',
    favorites_empty_desc: 'قائمة المفضلة فارغة حالياً! اضغط على أيقونة القلب في المنتجات التي تنال إعجابك للرجوع إليها لاحقاً.',
    explore_products: 'استكشف المنتجات',
    explore_products_desc: 'عربة التسوق فارغة! دعنا نشحنها ببعض المنتجات الذكية والمبتكرة لمنزلك.',
    switches: 'مفاتيح ذكية',
    solar: 'طاقة شمسية',
    timers: 'مؤقتات',
    lighting: 'إضاءة',
    breakers: 'قواطع',
    solar_offer: 'عروض الطاقة الشمسية',
    solar_desc: 'خصومات تصل إلى 30%',
    smart_lighting: 'إضاءة ذكية',
    lighting_desc: 'تحكم في منزلك بذكاء',
    original_cables: 'كابلات أصلية',
    cable_desc: 'جودة عالية لسلامة منزلك',
    industrial_control: 'تحكم صناعي',
    ind_desc: 'أحدث التقنيات للمصانع',
    switches_sockets: 'مفاتيح وأفياش',
    switch_desc: 'تصاميم عصرية تناسب ذوقك',
    contact_placeholder: 'اكتب رسالتك هنا...',
    message_sent: 'تم إرسال رسالتك بنجاح!',
    send_message: 'إرسال الرسالة',
    full_name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    user_name: 'أحمد محمد',
    sar: 'ريال سعودي',
    usd: 'دولار أمريكي',
    yer: 'ريال يمني',
    tracking_number: 'رقم التتبع',
    tracking_status: 'حالة الشحن',
    track_order: 'تتبع الطلب',
    loading_tracking: 'جاري جلب معلومات التتبع...',
    tracking_not_available: 'معلومات التتبع غير متوفرة لهذا الطلب.',
    in_transit: 'في الطريق',
    out_for_delivery: 'خارج للتوصيل',
    at_warehouse: 'في المستودع الرئيسي',
    shipped_from_origin: 'تم الشحن من المصدر',
    admin_dashboard: 'لوحة تحكم الإدارة',
    total_sales: 'إجمالي المبيعات',
    total_profit: 'إجمالي الأرباح',
    orders_count: 'عدد الطلبات',
    sales_overview: 'نظرة عامة على المبيعات',
    revenue_chart: 'رسم بياني للإيرادات',
    categories_distribution: 'توزيع الأصناف',
    monthly_performance: 'الأداء الشهري',
    stats: 'الإحصائيات',
    request_engineer: 'طلب مهندس',
    engineer_service_desc: 'خدمة الفحص والصيانة المنزلية بواسطة مهندسين مختصين',
    phone_number: 'رقم الهاتف',
    problem_desc: 'وصف المشكلة/الطلب',
    submit_request: 'إرسال الطلب',
    request_received: 'تم استلام طلبك بنجاح',
    technician_contact: 'سيتواصل معك الفني المختص خلال 24 ساعة',
    service_type: 'نوع الخدمة',
    installation: 'تركيب جديد',
    maintenance: 'صيانة',
    inspection: 'فحص دوري',
    added_to_cart: 'تمت الإضافة للسلة بنجاح',
    removed_from_favorites: 'تمت الإزالة من المفضلة',
    added_to_favorites: 'تمت الإضافة للمفضلة',
    review_published: 'تم نشر تقييمك بنجاح',
    admin: 'مدير النظام',
    viewer: 'مشاهد فقط',
    role: 'الصلاحية',
    manage_products: 'إدارة المنتجات',
    order_management: 'إدارة الطلبات',
    read_only_access: 'لديك صلاحية المشاهدة فقط. لا يمكنك التعديل.',
    admin_actions: 'إجراءات المدير',
    quick_view: 'نظرة سريعة',
    close: 'إغلاق',
    update_status: 'تحديث الحالة',
    customer_info: 'معلومات العميل',
    order_management_dashboard: 'إدارة طلبات العملاء',
    change_status: 'تغيير الحالة',
  },
  en: {
    welcome_title: 'Smart Electric Store',
    welcome_subtitle: 'Integrated electrical solutions for your home and factory with the highest quality and best prices',
    enter_store: 'Enter Store',
    home: 'Home',
    categories: 'Categories',
    cart: 'Cart',
    orders: 'Orders',
    profile: 'Profile',
    search_placeholder: 'Search for products...',
    popular_categories: 'Popular Categories',
    featured_products: 'Featured Products',
    add_to_cart: 'Add to Cart',
    subtotal: 'Subtotal',
    shipping: 'Shipping Cost',
    total: 'Total',
    checkout: 'Checkout',
    shipping_info: 'Shipping Information',
    address: 'Address',
    city: 'City',
    postal_code: 'Postal Code',
    get_location: 'Get My Location',
    locating: 'Locating...',
    coordinates_success: 'Coordinates determined successfully',
    view_on_maps: 'View on Google Maps',
    empty_cart: 'Your cart is currently empty',
    start_shopping: 'Start Shopping Now',
    my_orders: 'My Orders',
    order_id: 'Order ID',
    date: 'Date',
    status: 'Status',
    edit_profile: 'Edit Profile',
    favorites: 'Favorites',
    settings: 'Settings',
    logout: 'Logout',
    fingerprint: 'Fingerprint Login',
    language: 'Language',
    appearance: 'Appearance',
    currency: 'Currency',
    contact_us: 'Contact Us',
    share_app: 'Share App',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    save_changes: 'Save Changes',
    payment_method: 'Payment Method',
    amount_required: 'Amount Required',
    transaction_id: 'Transaction ID',
    additional_notes: 'Additional Notes',
    payment_instruction: 'Please complete the bank transfer first, then enter the transaction number in the box above so the manager can review and confirm your order.',
    confirm_order: 'Confirm & Send Order',
    order_success: 'Your order has been sent successfully',
    review_notice: 'The transfer will be reviewed by the manager.',
    all: 'All',
    pending: 'Pending',
    shipping_status: 'Shipping',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    details: 'Details',
    product_details: 'Product Details',
    reviews: 'Reviews',
    add_your_review: 'Add Your Review',
    write_your_opinion: 'Write your opinion here...',
    publish_review: 'Publish Review',
    customer_reviews: 'Customer Reviews',
    no_reviews: 'No reviews yet',
    no_orders: 'No orders found',
    no_orders_desc: 'You haven\'t placed any orders yet. Start shopping now to see your orders here!',
    you: 'You',
    cart_empty: 'Your cart is currently empty',
    browser_no_geo: 'Your browser does not support geolocation',
    geo_error: 'Unable to determine location. Please ensure location access is enabled.',
    address_placeholder: 'e.g., Al Narjis District, King Fahd Road',
    favorites_empty: 'Your favorites list is empty',
    favorites_empty_desc: 'Mark some items with a heart to keep track of what you love and save them for later.',
    explore_products: 'Explore Products',
    explore_products_desc: 'Your cart is waiting for some energy! Explore our smart products and start your journey today.',
    switches: 'Smart Switches',
    solar: 'Solar Power',
    timers: 'Timers',
    lighting: 'Lighting',
    breakers: 'Breakers',
    solar_offer: 'Solar Energy Offers',
    solar_desc: 'Discounts up to 30%',
    smart_lighting: 'Smart Lighting',
    lighting_desc: 'Control your home smartly',
    original_cables: 'Original Cables',
    cable_desc: 'High quality for home safety',
    industrial_control: 'Industrial Control',
    ind_desc: 'Latest technology for factories',
    switches_sockets: 'Switches & Sockets',
    switch_desc: 'Modern designs for your taste',
    contact_placeholder: 'Write your message here...',
    message_sent: 'Your message has been sent successfully!',
    send_message: 'Send Message',
    full_name: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    user_name: 'Ahmed Mohamed',
    sar: 'Saudi Riyal (SAR)',
    usd: 'US Dollar (USD)',
    yer: 'Yemeni Rial (YER)',
    tracking_number: 'Tracking Number',
    tracking_status: 'Shipping Status',
    track_order: 'Track Order',
    loading_tracking: 'Fetching tracking info...',
    tracking_not_available: 'Tracking info not available for this order.',
    in_transit: 'In Transit',
    out_for_delivery: 'Out for Delivery',
    at_warehouse: 'At Main Warehouse',
    shipped_from_origin: 'Shipped from Origin',
    admin_dashboard: 'Admin Dashboard',
    total_sales: 'Total Sales',
    total_profit: 'Total Profit',
    orders_count: 'Orders Count',
    sales_overview: 'Sales Overview',
    revenue_chart: 'Revenue Chart',
    categories_distribution: 'Categories Distribution',
    monthly_performance: 'Monthly Performance',
    stats: 'Stats',
    request_engineer: 'Request Engineer',
    engineer_service_desc: 'Home inspection and maintenance service by specialized engineers',
    phone_number: 'Phone Number',
    problem_desc: 'Problem Description',
    submit_request: 'Submit Request',
    request_received: 'Request received successfully',
    technician_contact: 'A technician will contact you within 24 hours',
    service_type: 'Service Type',
    installation: 'New Installation',
    maintenance: 'Maintenance',
    inspection: 'Regular Inspection',
    added_to_cart: 'Item added to cart successfully',
    removed_from_favorites: 'Removed from favorites',
    added_to_favorites: 'Added to favorites',
    review_published: 'Your review has been published',
    admin: 'Administrator',
    viewer: 'Viewer',
    role: 'Role',
    manage_products: 'Manage Products',
    order_management: 'Order Management',
    read_only_access: 'You have read-only access. You can not edit.',
    admin_actions: 'Admin Actions',
    quick_view: 'Quick View',
    close: 'Close',
    update_status: 'Update Status',
    customer_info: 'Customer Info',
    order_items: 'Order Items',
    order_management_dashboard: 'Order Management Dashboard',
    change_status: 'Change Status',
  }
};

// --- Components ---

const ProductCard: React.FC<{ 
  product: Product, 
  onClick: () => void, 
  onAddToCart: (p: Product) => void,
  onToggleFavorite: (p: Product) => void,
  onQuickView: (p: Product) => void,
  isFavorite: boolean,
  formatPrice: (p: number) => string,
  t: (k: string) => string
}> = ({ 
  product, 
  onClick, 
  onAddToCart, 
  onToggleFavorite, 
  onQuickView,
  isFavorite,
  formatPrice,
  t
}) => (
  <GlassCard 
    className="p-1.5 border border-slate-100 dark:border-slate-800 cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative aspect-square rounded-md overflow-hidden mb-1.5">
      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          className="bg-white/90 dark:bg-slate-900/90 text-black dark:text-white p-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          title={t('quick_view')}
        >
          <Eye size={16} />
        </button>
      </div>
      <button 
        className={`absolute top-1 left-1 p-1 glass rounded-full transition-colors z-10 ${isFavorite ? 'text-red-600' : 'text-black hover:text-red-600'}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
      >
        <Heart size={12} className={isFavorite ? "fill-red-600" : ""} />
      </button>
    </div>
    <h4 className="text-[11px] font-bold mb-0.5 line-clamp-1 text-black">{product.name}</h4>
    <div className="flex items-center gap-1 mb-1">
      <Star size={10} className="fill-yellow-400 text-yellow-400" />
      <span className="text-[10px] font-bold text-black">{product.rating}</span>
      <span className="text-[9px] text-black">({product.reviewCount})</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-red-600 font-bold text-xs">{formatPrice(product.price)}</span>
      <button 
        className="p-1 bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
      >
        <Plus size={12} />
      </button>
    </div>
  </GlassCard>
);

const QuickViewModal = ({ 
  product, 
  onClose, 
  onAddToCart, 
  formatPrice, 
  t 
}: { 
  product: Product, 
  onClose: () => void, 
  onAddToCart: (p: Product) => void,
  formatPrice: (p: number) => string,
  t: (k: string) => string
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="w-full max-w-sm relative z-10"
    >
      <GlassCard className="p-0 overflow-hidden border border-white/20 shadow-2xl">
        <div className="relative">
          <img src={product.image} className="w-full aspect-[4/3] object-cover" alt={product.name} referrerPolicy="no-referrer" />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 glass rounded-full text-black hover:text-red-600 transition-colors shadow-lg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-black">{product.name}</h2>
              <span className="text-xs text-slate-500 uppercase tracking-widest">{t(product.category) || product.category}</span>
            </div>
            <p className="text-xl font-bold text-red-600">{formatPrice(product.price)}</p>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-lg border border-yellow-400/20">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{product.reviewCount} {t('reviews')}</span>
          </div>

          <p className="text-xs text-black/70 mb-6 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onClose}
              className="py-3 px-4 glass rounded-xl text-xs font-bold text-black hover:bg-slate-100 transition-colors"
            >
              {t('close')}
            </button>
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="py-3 px-4 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-600/20 hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              {t('add_to_cart')}
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-card ${className} ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
  >
    {children}
  </div>
);

const Navbar = ({ currentView, setView, cartCount, t }: { currentView: View, setView: (v: View) => void, cartCount: number, t: (k: string) => string }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: t('home') },
    { id: 'categories', icon: Grid, label: t('categories') },
    { id: 'cart', icon: ShoppingCart, label: t('cart'), badge: cartCount },
    { id: 'orders', icon: ClipboardList, label: t('orders') },
    { id: 'profile', icon: User, label: t('profile') },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md glass backdrop-blur-xl rounded-xl p-1 flex justify-around items-center z-50 border border-slate-200 dark:border-slate-800">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id as View)}
          className={`flex flex-col items-center p-1.5 rounded-lg transition-all duration-300 relative ${
            currentView === item.id ? 'bg-red-600 text-white scale-105' : 'text-black hover:text-red-600'
          }`}
        >
          <item.icon size={20} />
          {item.badge !== undefined && item.badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-slate-50 dark:border-slate-900">
              {item.badge}
            </span>
          )}
          <span className="text-[9px] mt-0.5 font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Banner Slider ---
const BannerSlider = ({ t }: { t: (k: string) => string }) => {
  const [current, setCurrent] = useState(0);
  const banners = [
    { id: 1, title: t('solar_offer'), desc: t('solar_desc'), img: 'https://picsum.photos/seed/solar-hero/800/400' },
    { id: 2, title: t('smart_lighting'), desc: t('lighting_desc'), img: 'https://picsum.photos/seed/light-hero/800/400' },
    { id: 3, title: t('original_cables'), desc: t('cable_desc'), img: 'https://picsum.photos/seed/cable-hero/800/400' },
    { id: 4, title: t('industrial_control'), desc: t('ind_desc'), img: 'https://picsum.photos/seed/ind-hero/800/400' },
    { id: 5, title: t('switches_sockets'), desc: t('switch_desc'), img: 'https://picsum.photos/seed/switch-hero/800/400' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-32 glass rounded-2xl mb-4 overflow-hidden relative border border-slate-200">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img 
            src={banners[current].img} 
            className="w-full h-full object-cover opacity-40"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent dark:from-black/60 flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold mb-1 text-black">{banners[current].title}</h2>
            <p className="text-black">{banners[current].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? 'w-6 bg-red-600' : 'w-1.5 bg-slate-300 dark:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Pages ---

const WelcomePage = ({ onEnter, t, setRole, currentRole }: { onEnter: () => void, t: (k: string) => string, setRole: (r: UserRole) => void, currentRole: UserRole, key?: any }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
  >
    <motion.div 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="mb-12"
    >
      <div className="w-24 h-24 bg-red-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/20 mb-6 mx-auto">
        <Zap size={48} className="text-white" />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight text-black">{t('welcome_title')}</h1>
      <p className="text-black text-lg max-w-xs mx-auto">
        {t('welcome_subtitle')}
      </p>
    </motion.div>

    <div className="w-full max-w-xs space-y-4">
      {/* Role Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-4">
        <button 
          onClick={() => setRole('viewer')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${currentRole === 'viewer' ? 'bg-white dark:bg-slate-800 shadow-sm text-red-600' : 'text-slate-500'}`}
        >
          {t('viewer')}
        </button>
        <button 
          onClick={() => setRole('admin')}
          className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${currentRole === 'admin' ? 'bg-white dark:bg-slate-800 shadow-sm text-red-600' : 'text-slate-500'}`}
        >
          {t('admin')}
        </button>
      </div>

      <button 
        onClick={onEnter} 
        className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 hover:bg-red-700 transition-all active:scale-95 group"
      >
        {t('enter_store')}
        <ChevronLeft size={20} className="rtl:rotate-0 ltr:rotate-180 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
        <span className="text-[10px] text-black font-bold uppercase tracking-widest">{t('or') || 'أو'}</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
      </div>

      <button onClick={onEnter} className="w-full glass-button flex items-center justify-center gap-3">
        <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
        {t('login_google') || 'Google'}
      </button>
    </div>
  </motion.div>
);

const HomePage = ({ 
  setView, 
  setSelectedProduct, 
  setQuickViewProduct,
  addToCart, 
  favorites, 
  toggleFavorite,
  formatPrice,
  t
}: { 
  setView: (v: View) => void, 
  setSelectedProduct: (p: Product) => void, 
  setQuickViewProduct: (p: Product) => void,
  addToCart: (p: Product) => void,
  favorites: string[],
  toggleFavorite: (p: Product) => void,
  formatPrice: (p: number) => string,
  t: (k: string) => string,
  key?: any
}) => {
  const [search, setSearch] = useState('');
  
  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-20 pt-2 px-3"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-500/20">
            <Zap size={18} />
          </div>
          <h1 className="text-lg font-bold text-black">{t('welcome_title')}</h1>
        </div>
        <button className="relative p-1.5 glass rounded-full text-black hover:text-red-600 border border-slate-200 dark:border-slate-800">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-slate-50 dark:border-slate-900"></span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black" size={16} />
        <input 
          type="text" 
          placeholder={t('search_placeholder')}
          className="w-full glass-input pr-9 py-2 text-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Banner Slider */}
      <div className="mb-4">
        <BannerSlider t={t} />
      </div>

      {/* Categories Mini List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold text-black">{t('categories')}</h3>
          <button onClick={() => setView('categories')} className="text-red-600 text-[10px] font-bold">{t('all')}</button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <div key={cat.id} className="flex flex-col items-center gap-1 min-w-[65px]">
              <div className="w-12 h-12 glass rounded-lg flex items-center justify-center text-red-600 border border-slate-200 dark:border-slate-800">
                {cat.id === 'switches' && <Zap size={18} />}
                {cat.id === 'solar' && <Sun size={18} />}
                {cat.id === 'timers' && <Clock size={18} />}
                {cat.id === 'lighting' && <Lightbulb size={18} />}
                {cat.id === 'breakers' && <ShieldAlert size={18} />}
              </div>
              <span className="text-[9px] text-center whitespace-nowrap text-black">{t(cat.id) || cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New Products */}
      <div>
        <h3 className="text-base font-bold mb-2 text-black">{t('featured_products')}</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onQuickView={setQuickViewProduct}
              formatPrice={formatPrice}
              t={t}
              onClick={() => {
                setSelectedProduct(product);
                setView('product-detail');
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProductDetailPage = ({ 
  product, 
  setView, 
  addToCart, 
  formatPrice, 
  t 
}: { 
  product: Product, 
  setView: (v: View) => void, 
  addToCart: (p: Product) => void, 
  formatPrice: (p: number) => string,
  t: (k: string) => string,
  key?: any
}) => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState(product.reviews);

  const handleSubmitReview = () => {
    if (userRating === 0) return;
    const newReview = {
      id: Math.random().toString(),
      userName: t('you') || 'أنت',
      rating: userRating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setComment('');
    toast.success(t('review_published'));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="pb-32 pt-4 px-4"
    >
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setView('home')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rotate-180" />
        </button>
        <h2 className="text-xl font-bold text-black">{t('product_details')}</h2>
      </div>

      <div className="aspect-square w-full rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-black">{product.name}</h1>
          <span className="text-2xl font-bold text-red-600">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-yellow-700">{product.rating}</span>
          </div>
          <span className="text-black text-sm">{product.reviewCount} {t('reviews')}</span>
        </div>
        <p className="text-black leading-relaxed">{product.description}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-black">{t('add_your_review')}</h3>
        <GlassCard className="p-4 border border-slate-100 dark:border-slate-800">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setUserRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={28} 
                  className={star <= userRating ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-slate-600"} 
                />
              </button>
            ))}
          </div>
          <textarea 
            placeholder={t('write_your_opinion')} 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full glass-input h-24 mb-4 resize-none p-3"
          />
          <button 
            onClick={handleSubmitReview}
            disabled={userRating === 0}
            className={`w-full glass-button ${userRating === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {t('publish_review')}
          </button>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4 text-black">{t('customer_reviews')} ({reviews.length})</h3>
        <div className="space-y-4">
          {reviews.length > 0 ? reviews.map((review) => (
            <GlassCard key={review.id} className="p-4 border border-slate-50 dark:border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-black">{review.userName}</span>
                <span className="text-xs text-black">{review.date}</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={12} 
                    className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300 dark:text-slate-700"} 
                  />
                ))}
              </div>
              <p className="text-sm text-black">{review.comment}</p>
            </GlassCard>
          )) : (
            <p className="text-center text-black py-8">{t('no_reviews')}</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 px-6 z-40">
        <button 
          onClick={() => {
            addToCart(product);
            setView('cart');
          }}
          className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <ShoppingCart size={20} />
          {t('add_to_cart')}
        </button>
      </div>
    </motion.div>
  );
};

const CategoriesPage = ({ 
  setView, 
  setSelectedProduct, 
  setQuickViewProduct,
  addToCart, 
  favorites, 
  toggleFavorite,
  formatPrice,
  t
}: { 
  setView: (v: View) => void, 
  setSelectedProduct: (p: Product) => void, 
  setQuickViewProduct: (p: Product) => void,
  addToCart: (p: Product) => void,
  favorites: string[],
  toggleFavorite: (p: Product) => void,
  formatPrice: (p: number) => string,
  t: (k: string) => string,
  key?: any
}) => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const filteredProducts = selectedCat 
    ? PRODUCTS.filter(p => p.category === selectedCat)
    : PRODUCTS;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('home')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rotate-180" />
        </button>
        <h2 className="text-3xl font-bold text-black">{t('categories')}</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        <button 
          onClick={() => setSelectedCat(null)}
          className={`px-6 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${!selectedCat ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'glass text-black'}`}
        >
          {t('all')}
        </button>
        {CATEGORIES.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-6 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${selectedCat === cat.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'glass text-black'}`}
          >
            {t(cat.id) || cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onQuickView={setQuickViewProduct}
              formatPrice={formatPrice}
              t={t}
              onClick={() => {
                setSelectedProduct(product);
                setView('product-detail');
              }}
            />
          ))}
      </div>
    </motion.div>
  );
};

const FavoritesPage = ({ 
  setView, 
  setSelectedProduct, 
  setQuickViewProduct,
  addToCart, 
  favorites, 
  toggleFavorite,
  formatPrice,
  t
}: { 
  setView: (v: View) => void, 
  setSelectedProduct: (p: Product) => void, 
  setQuickViewProduct: (p: Product) => void,
  addToCart: (p: Product) => void,
  favorites: string[],
  toggleFavorite: (p: Product) => void,
  formatPrice: (p: number) => string,
  t: (k: string) => string,
  key?: any
}) => {
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('home')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rotate-180" />
        </button>
        <h2 className="text-3xl font-bold text-black">{t('favorites')}</h2>
      </div>

      {favoriteProducts.length === 0 ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] glass rounded-[3rem] p-10 text-center border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner"
          >
            <Heart size={36} className="text-red-600" fill="currentColor" />
          </motion.div>
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-black mb-2"
          >
            {t('favorites_empty')}
          </motion.h3>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 max-w-[240px] mb-8 leading-relaxed text-xs"
          >
            {t('favorites_empty_desc')}
          </motion.p>
          <motion.button 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('home')} 
            className="glass-button bg-red-600 text-white border-none px-8 py-3 rounded-2xl shadow-lg shadow-red-600/30 font-bold hover:bg-red-700 transition-all flex items-center gap-2"
          >
            <Grid size={18} />
            {t('explore_products')}
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onQuickView={setQuickViewProduct}
              formatPrice={formatPrice}
              t={t}
              onClick={() => {
                setSelectedProduct(product);
                setView('product-detail');
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const OrdersPage = ({ orders, t, formatPrice, setView }: { orders: Order[], t: (k: string) => string, formatPrice: (p: number) => string, setView: (v: View) => void, key?: any }) => {
  const [filter, setFilter] = useState('all');
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);
  const [trackingInfo, setTrackingInfo] = useState<{ number: string, status: string } | null>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  const statusMap: { [key: string]: string } = {
    all: t('all'),
    pending: t('pending'),
    shipping: t('shipping_status'),
    delivered: t('delivered'),
    cancelled: t('cancelled')
  };

  const handleTrackOrder = async (orderId: string) => {
    if (trackingOrder === orderId) {
      setTrackingOrder(null);
      return;
    }
    setTrackingOrder(orderId);
    setIsLoadingTracking(true);
    setTrackingInfo(null);

    // Mock API Call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockStatuses = [
      { key: 'shipped_from_origin', step: 1 },
      { key: 'at_warehouse', step: 2 },
      { key: 'in_transit', step: 3 },
      { key: 'out_for_delivery', step: 4 }
    ];
    const randomIdx = Math.floor(Math.random() * mockStatuses.length);
    const selected = mockStatuses[randomIdx];
    
    setTrackingInfo({
      number: `TRK-${orderId}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: t(selected.key),
      currentStep: selected.step
    } as any);
    setIsLoadingTracking(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-black">{t('orders')}</h2>
      
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
        {Object.entries(statusMap).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              filter === key ? 'bg-red-600 text-white' : 'glass text-black border border-slate-200 dark:border-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.filter(o => filter === 'all' || o.status === filter).length === 0 ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[40vh] glass rounded-[3rem] p-10 text-center border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900/20 rounded-full flex items-center justify-center mb-6">
              <ClipboardList size={28} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">{t('no_orders')}</h3>
            <p className="text-slate-500 text-xs mb-8 max-w-[200px] leading-relaxed">
              {t('no_orders_desc')}
            </p>
            <button 
              onClick={() => setView('home')}
              className="glass-button bg-red-600 text-white border-none px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all text-xs"
            >
              {t('start_shopping')}
            </button>
          </motion.div>
        ) : (
          orders
            .filter(o => filter === 'all' || o.status === filter)
            .map((order) => (
            <div key={order.id} className="space-y-2">
              <GlassCard className="p-5 flex justify-between items-center border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-bold mb-1 text-black">{order.id}</h4>
                  <p className="text-xs text-black">{order.date}</p>
                  <p className="text-red-600 font-bold mt-2">{formatPrice(order.total)}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600' :
                    order.status === 'shipping' ? 'bg-blue-500/10 text-blue-600' :
                    'bg-red-500/10 text-red-600'
                  }`}>
                    {statusMap[order.status as keyof typeof statusMap]}
                  </span>
                  <div className="flex flex-col gap-2 mt-4">
                    {order.status === 'shipping' && (
                      <button 
                        onClick={() => handleTrackOrder(order.id)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                      >
                        {t('track_order')}
                      </button>
                    )}
                    <button 
                      onClick={() => setTrackingOrder(trackingOrder === order.id ? null : order.id)}
                      className="block text-xs text-black hover:text-black"
                    >
                      {t('details')}
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Tracking Info Section */}
              <AnimatePresence>
                {trackingOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <GlassCard className="p-4 bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/20">
                      {isLoadingTracking ? (
                        <div className="flex items-center justify-center gap-3 py-2">
                          <Activity size={16} className="animate-pulse text-red-600" />
                          <span className="text-xs text-black">{t('loading_tracking')}</span>
                        </div>
                      ) : trackingInfo ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider text-black">{t('tracking_number')}</span>
                            <span className="text-xs font-mono font-bold text-black">{trackingInfo.number}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] uppercase tracking-wider text-black">{t('tracking_status')}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                              <span className="text-xs font-bold text-emerald-600">{trackingInfo.status}</span>
                            </div>
                          </div>
                          <div className="pt-4">
                            <div className="flex justify-between mb-2">
                              {['shipped_from_origin', 'at_warehouse', 'in_transit', 'out_for_delivery'].map((key, i) => (
                                <div key={key} className="flex flex-col items-center gap-1 flex-1">
                                  <div className={`w-3 h-3 rounded-full border-2 ${
                                    (trackingInfo as any).currentStep > i 
                                      ? 'bg-red-600 border-red-600' 
                                      : (trackingInfo as any).currentStep === i + 1 
                                        ? 'bg-white border-red-600 animate-pulse' 
                                        : 'bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                                  }`} />
                                  <span className={`text-[8px] text-center leading-tight ${
                                    (trackingInfo as any).currentStep >= i + 1 ? 'text-red-600 font-bold' : 'text-slate-400'
                                  }`}>
                                    {t(key)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((trackingInfo as any).currentStep / 4) * 100}%` }}
                                className="absolute top-0 left-0 h-full bg-red-600"
                              />
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-3">
                            <p className="text-[10px] uppercase tracking-wider text-black mb-2">{t('order_items')}</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => {
                                const product = PRODUCTS.find(p => p.id === item.productId);
                                return (
                                  <div key={idx} className="flex justify-between items-center text-xs">
                                    <span className="text-black">{product?.name || item.productId} x{item.quantity}</span>
                                    <span className="font-bold text-black">{formatPrice((product?.price || 0) * item.quantity)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Order Items only if not shipping or loading */}
                          <div className="pt-1">
                            <p className="text-[10px] uppercase tracking-wider text-black mb-2">{t('order_items')}</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => {
                                const product = PRODUCTS.find(p => p.id === item.productId);
                                return (
                                  <div key={idx} className="flex justify-between items-center text-xs">
                                    <span className="text-black">{product?.name || item.productId} x{item.quantity}</span>
                                    <span className="font-bold text-black">{formatPrice((product?.price || 0) * item.quantity)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

const AdminOrdersPage = ({ 
  orders, 
  updateOrderStatus, 
  t, 
  formatPrice, 
  setView, 
  role 
}: { 
  orders: Order[], 
  updateOrderStatus: (id: string, status: Order['status']) => void, 
  t: (k: string) => string, 
  formatPrice: (p: number) => string, 
  setView: (v: View) => void,
  role: UserRole,
  key?: any 
}) => {
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  const statuses: Order['status'][] = ['pending', 'shipping', 'delivered', 'cancelled'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setView('admin-dashboard')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-black">{t('order_management_dashboard')}</h2>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
        {['all', ...statuses].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-xs font-bold ${
              filter === s ? 'bg-red-600 text-white' : 'glass text-black border border-slate-200 dark:border-slate-800'
            }`}
          >
            {s === 'all' ? t('all') : t(s)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <GlassCard key={order.id} className="p-4 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-black">{order.id}</h3>
                <p className="text-[10px] text-slate-500">{order.date}</p>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                order.status === 'delivered' ? 'bg-emerald-100 text-emerald-600' :
                order.status === 'shipping' ? 'bg-blue-100 text-blue-600' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                'bg-amber-100 text-amber-600'
              }`}>
                {t(order.status)}
              </span>
            </div>

            {order.customerInfo && (
              <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <p className="text-[10px] font-bold text-black mb-1 flex items-center gap-2">
                  <User size={12} className="text-red-600" />
                  {t('customer_info')}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-black">
                  <p><span className="text-slate-500">{t('name')}:</span> {order.customerInfo.name}</p>
                  <p dir="ltr" className="rtl:text-right ltr:text-left"><span className="text-slate-500">{t('phone')}:</span> {order.customerInfo.phone}</p>
                  <p className="col-span-2"><span className="text-slate-500">{t('address')}:</span> {order.customerInfo.address}</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <p className="text-[10px] font-bold text-black mb-1 flex items-center gap-2">
                <Box size={12} className="text-red-600" />
                {t('order_items')}
              </p>
              <div className="space-y-1">
                {order.items.map((item, idx) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className="flex justify-between items-center text-[10px] text-black">
                      <span>{product?.name || item.productId} x{item.quantity}</span>
                      <span className="font-bold">{formatPrice((product?.price || 0) * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-right border-t border-slate-100 pt-1">
                <span className="text-xs font-bold text-red-600">{t('total')}: {formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              {statuses.map((s) => (
                <button
                  key={s}
                  disabled={role === 'viewer' || order.status === s}
                  onClick={() => updateOrderStatus(order.id, s)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all ${
                    order.status === s 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                      : role === 'viewer'
                        ? 'opacity-50 grayscale cursor-not-allowed'
                        : 'glass text-black hover:bg-slate-50 active:scale-95'
                  }`}
                >
                  {t('change_to')} {t(s)}
                </button>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  );
};

const AdminDashboard = ({ setView, t, formatPrice, role }: { setView: (v: View) => void, t: (k: string) => string, formatPrice: (p: number) => string, role: UserRole, key?: any }) => {
  const salesData = [
    { name: 'Sat', sales: 4000, profit: 2400 },
    { name: 'Sun', sales: 3000, profit: 1398 },
    { name: 'Mon', sales: 2000, profit: 9800 },
    { name: 'Tue', sales: 2780, profit: 3908 },
    { name: 'Wed', sales: 1890, profit: 4800 },
    { name: 'Thu', sales: 2390, profit: 3800 },
    { name: 'Fri', sales: 3490, profit: 4300 },
  ];

  const categoryData = [
    { name: t('switches'), value: 400 },
    { name: t('solar'), value: 300 },
    { name: t('lighting'), value: 300 },
    { name: t('breakers'), value: 200 },
  ];

  const COLORS = ['#dc2626', '#10b981', '#3b82f6', '#f59e0b'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('profile')} className="p-2 glass rounded-full text-black">
            <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
          </button>
          <h2 className="text-2xl font-bold text-black">{t('admin_dashboard')}</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${role === 'admin' ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
          {role === 'admin' ? t('admin') : t('viewer')}
        </div>
      </div>

      {role === 'viewer' && (
        <div className="mb-6 p-4 glass border border-amber-200 bg-amber-50/30 rounded-2xl flex items-center gap-3">
          <ShieldAlert size={20} className="text-amber-600 shrink-0" />
          <p className="text-xs text-amber-700 font-medium">{t('read_only_access')}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <GlassCard className="p-4 border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{t('total_sales')}</p>
          <p className="text-xl font-bold text-black">{formatPrice(19560)}</p>
        </GlassCard>
        <GlassCard className="p-4 border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">{t('orders_count')}</p>
          <p className="text-xl font-bold text-black">124</p>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold mb-6 text-black border-b border-slate-100 dark:border-slate-800 pb-2">{t('revenue_chart')}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '10px', color: '#000' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold mb-6 text-black border-b border-slate-100 dark:border-slate-800 pb-2">{t('categories_distribution')}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold mb-6 text-black border-b border-slate-100 dark:border-slate-800 pb-2">{t('monthly_performance')}</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="profit" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Exclusive Admin Actions */}
        <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold mb-6 text-black border-b border-slate-100 dark:border-slate-800 pb-2">{t('admin_actions')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              disabled={role === 'viewer'}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${role === 'viewer' ? 'opacity-50 grayscale bg-slate-50 border-slate-100 cursor-not-allowed' : 'bg-red-50/50 border-red-100 hover:bg-red-100 active:scale-95'}`}
            >
              <Box size={20} className="text-red-600" />
              <span className="text-[10px] font-bold text-black">{t('manage_products')}</span>
            </button>
            <button 
              disabled={role === 'viewer'}
              onClick={() => setView('admin-orders')}
              className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all ${role === 'viewer' ? 'opacity-50 grayscale bg-slate-50 border-slate-100 cursor-not-allowed' : 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-100 active:scale-95'}`}
            >
              <ShoppingCart size={20} className="text-emerald-600" />
              <span className="text-[10px] font-bold text-black">{t('order_management')}</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

const RequestEngineerPage = ({ setView, t, key }: { setView: (v: View) => void, t: (k: string) => string, key?: any }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', type: 'maintenance', desc: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setView('home'), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('home')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-black">{t('request_engineer')}</h2>
      </div>

      <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 mb-4">{t('engineer_service_desc')}</p>
            
            <div>
              <label className="text-xs font-bold text-black block mb-1">{t('full_name')}</label>
              <input 
                required
                type="text" 
                className="w-full glass-input"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black block mb-1">{t('phone_number')}</label>
              <input 
                required
                type="tel" 
                className="w-full glass-input"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-black block mb-1">{t('service_type')}</label>
              <select 
                className="w-full glass-input"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="installation">{t('installation')}</option>
                <option value="maintenance">{t('maintenance')}</option>
                <option value="inspection">{t('inspection')}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-black block mb-1">{t('problem_desc')}</label>
              <textarea 
                required
                className="w-full glass-input min-h-[100px] resize-none"
                value={formData.desc}
                onChange={e => setFormData({...formData, desc: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full glass-button bg-red-600 text-white border-none py-3 shadow-lg shadow-red-600/20 font-bold active:scale-95 transition-all">
              {t('submit_request')}
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2">{t('request_received')}</h3>
            <p className="text-xs text-slate-500">{t('technician_contact')}</p>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
};

const CartPage = ({ setView, cart, removeFromCart, updateQuantity, formatPrice, t }: { 
  setView: (v: View) => void, 
  cart: CartItem[], 
  removeFromCart: (id: string) => void, 
  updateQuantity: (id: string, delta: number) => void,
  formatPrice: (p: number) => string,
  t: (k: string) => string,
  key?: any
}) => {
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    lat: null as number | null,
    lng: null as number | null
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(t('browser_no_geo'));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setShippingInfo(prev => ({
          ...prev,
          lat: latitude,
          lng: longitude,
          address: prev.address || `${t('coordinates_success')} (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        }));
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert(t('geo_error'));
        setIsLocating(false);
      }
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal > 0 ? 25 : 0;
  const total = subtotal + shippingCost;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <h2 className="text-3xl font-bold mb-8 text-black">{t('cart')}</h2>
      
      {cart.length === 0 ? (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] glass rounded-[3rem] p-10 text-center border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 shadow-inner"
          >
            <ShoppingCart size={36} className="text-red-600" />
          </motion.div>
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-bold text-black mb-2"
          >
            {t('cart_empty')}
          </motion.h3>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 max-w-[240px] mb-8 leading-relaxed text-xs"
          >
            {t('explore_products_desc')}
          </motion.p>
          <motion.button 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setView('home')} 
            className="glass-button bg-red-600 text-white border-none px-8 py-3 rounded-2xl shadow-lg shadow-red-600/30 font-bold hover:bg-red-700 transition-all flex items-center gap-2"
          >
            <ShoppingBag size={18} />
            {t('start_shopping')}
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <GlassCard key={item.product.id} className="p-3 flex gap-4 border border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0">
                <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name} referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-black line-clamp-1">{item.product.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-red-600 font-bold text-sm mt-1">{formatPrice(item.product.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="w-6 h-6 glass rounded-md flex items-center justify-center text-slate-600 dark:text-slate-400"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-4 text-center text-black">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="w-6 h-6 glass rounded-md flex items-center justify-center text-slate-600 dark:text-slate-400"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Shipping Information Section */}
          <div className="mt-8 glass rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">{t('shipping_info')}</h3>
              <button 
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center gap-2 text-xs font-bold text-red-600 glass px-3 py-1.5 rounded-full border border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
              >
                <MapPin size={14} className={isLocating ? "animate-pulse" : ""} />
                {isLocating ? t('locating') : t('get_location')}
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-black mb-1 block">{t('address')}</label>
                <textarea 
                  placeholder={t('address_placeholder')} 
                  className="w-full glass-input py-2 text-xs min-h-[60px] resize-none"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                />
              </div>
              {shippingInfo.lat && shippingInfo.lng && (
                <div className="p-3 glass rounded-xl border border-emerald-100 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-900/10">
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {t('coordinates_success')}
                  </p>
                  <a 
                    href={`https://www.google.com/maps?q=${shippingInfo.lat},${shippingInfo.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-600 dark:text-blue-400 underline mt-1 block"
                  >
                    {t('view_on_maps')}
                  </a>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-black mb-1 block">{t('city')}</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    className="w-full glass-input py-2 text-xs"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs text-black mb-1 block">{t('postal_code')}</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    className="w-full glass-input py-2 text-xs"
                    value={shippingInfo.postalCode}
                    onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 glass rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-black text-sm">{t('subtotal')}</span>
              <span className="font-bold text-black">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-black text-sm">{t('shipping')}</span>
              <span className="font-bold text-black">{formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-lg font-bold text-black">{t('total')}</span>
              <span className="text-xl font-bold text-red-600">{formatPrice(total)}</span>
            </div>
            <button 
              onClick={() => setView('payment')}
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-600/20 active:scale-95 transition-transform"
            >
              {t('checkout')}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ProfilePage = ({ 
  onLogout, 
  setView, 
  language, 
  setLanguage, 
  theme, 
  setTheme, 
  currency, 
  setCurrency,
  t
}: { 
  onLogout: () => void, 
  setView: (v: View) => void, 
  language: string,
  setLanguage: (lang: string) => void,
  theme: string,
  setTheme: (theme: string) => void,
  currency: string,
  setCurrency: (curr: string) => void,
  t: (k: string) => string,
  key?: any
}) => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState('');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'متجر الكهرباء الذكي',
          text: 'تسوق أفضل المنتجات الكهربائية والإضاءة!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      alert('ميزة المشاركة غير مدعومة في متصفحك');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="w-24 h-24 glass rounded-full p-1 mb-4 border border-slate-200">
          <img 
            src="https://picsum.photos/seed/user/200/200" 
            className="w-full h-full object-cover rounded-full" 
            alt="Avatar"
          />
        </div>
        <h3 className="text-2xl font-bold text-black">{t('user_name') || 'أحمد محمد'}</h3>
        <p className="text-black">ahmed@example.com</p>
      </div>

      <div className="space-y-4">
        {/* Profile Info */}
        <GlassCard 
          className="p-4 flex items-center gap-4 cursor-pointer border border-slate-100 dark:border-slate-800"
          onClick={() => setView('edit-profile')}
        >
          <User className="text-red-600" />
          <span className="flex-1 text-black">{t('edit_profile')}</span>
          <ChevronLeft size={20} className="text-black rtl:rotate-0 ltr:rotate-180" />
        </GlassCard>

        {/* Address Section */}
        <GlassCard className="p-4 border border-slate-100 dark:border-slate-800">
          <div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setShowAddress(!showAddress)}
          >
            <MapPin className="text-red-600" />
            <span className="flex-1 text-black">{t('address')}</span>
            <ChevronDown size={20} className={`text-black transition-transform ${showAddress ? 'rotate-180' : ''}`} />
          </div>
          {showAddress && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3"
            >
              <textarea 
                placeholder={t('address_placeholder') || "Enter your address..."}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full glass-input min-h-[80px] text-xs resize-none"
              />
              <button className="w-full glass-button bg-red-600 text-white border-none py-2 text-xs">{t('save_changes')}</button>
            </motion.div>
          )}
        </GlassCard>

        {/* Orders & Favorites */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard 
            className="p-4 flex flex-col items-center gap-2 cursor-pointer border border-slate-100 dark:border-slate-800"
            onClick={() => setView('favorites')}
          >
            <Heart className="text-red-600" />
            <span className="text-xs text-black">{t('favorites')}</span>
          </GlassCard>
          <GlassCard 
            className="p-4 flex flex-col items-center gap-2 cursor-pointer border border-slate-100 dark:border-slate-800"
            onClick={() => setView('orders')}
          >
            <ClipboardList className="text-red-600" />
            <span className="text-xs text-black">{t('my_orders')}</span>
          </GlassCard>
        </div>

        {/* Fingerprint Login */}
        <GlassCard className="p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800">
          <Fingerprint className="text-red-600" />
          <span className="flex-1 text-black">{t('fingerprint')}</span>
          <button 
            onClick={() => setIsFingerprintEnabled(!isFingerprintEnabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${isFingerprintEnabled ? 'bg-red-600' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isFingerprintEnabled ? 'rtl:left-1 ltr:right-1' : 'rtl:left-7 ltr:right-7'}`} />
          </button>
        </GlassCard>

        {/* Language Selector */}
        <GlassCard className="p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800">
          <Globe className="text-red-600" />
          <span className="flex-1 text-black">{t('language')}</span>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-black outline-none"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </GlassCard>

        {/* Theme Selector */}
        <GlassCard className="p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800">
          <Palette className="text-red-600" />
          <span className="flex-1 text-black">{t('appearance')}</span>
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map((tVal) => (
              <button
                key={tVal}
                onClick={() => setTheme(tVal)}
                className={`p-1.5 rounded-md transition-all ${theme === tVal ? 'bg-red-600 text-white' : 'glass text-black'}`}
              >
                {tVal === 'light' && <Sun size={14} />}
                {tVal === 'dark' && <Moon size={14} />}
                {tVal === 'system' && <Activity size={14} />}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Currency Selector */}
        <GlassCard className="p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800">
          <Coins className="text-red-600" />
          <span className="flex-1 text-black">{t('currency')}</span>
          <select 
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-transparent text-xs font-bold text-black outline-none"
          >
            <option value="SAR">{t('sar')}</option>
            <option value="USD">{t('usd')}</option>
            <option value="YER">{t('yer')}</option>
          </select>
        </GlassCard>

        {/* Admin Dashboard */}
        <GlassCard 
          className="p-4 flex items-center gap-4 cursor-pointer border border-slate-100 dark:border-slate-800 bg-red-50/50 dark:bg-red-900/10"
          onClick={() => setView('admin-dashboard')}
        >
          <Zap className="text-red-600" />
          <span className="flex-1 text-black font-bold">{t('admin_dashboard')}</span>
          <ChevronLeft size={20} className="text-black rtl:rotate-0 ltr:rotate-180" />
        </GlassCard>

        {/* Request Engineer */}
        <GlassCard 
          className="p-4 flex items-center gap-4 cursor-pointer border border-slate-100 dark:border-slate-800"
          onClick={() => setView('request-engineer')}
        >
          <Activity className="text-red-600" />
          <span className="flex-1 text-black font-bold">{t('request_engineer')}</span>
          <ChevronLeft size={20} className="text-black rtl:rotate-0 ltr:rotate-180" />
        </GlassCard>

        {/* Contact Us */}
        <GlassCard 
          className="p-4 flex items-center gap-4 cursor-pointer border border-slate-100 dark:border-slate-800"
          onClick={() => setView('contact')}
        >
          <MessageSquare className="text-red-600" />
          <span className="flex-1 text-black">{t('contact_us')}</span>
          <ChevronLeft size={20} className="text-black rtl:rotate-0 ltr:rotate-180" />
        </GlassCard>

        {/* Share App */}
        <GlassCard 
          className="p-4 flex items-center gap-4 cursor-pointer border border-slate-100 dark:border-slate-800"
          onClick={handleShare}
        >
          <Share2 className="text-red-600" />
          <span className="flex-1 text-black">{t('share_app')}</span>
          <ChevronLeft size={20} className="text-black rtl:rotate-0 ltr:rotate-180" />
        </GlassCard>

        {/* Legal */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4 flex flex-col items-center gap-2 cursor-pointer border border-slate-100 dark:border-slate-800">
            <FileText className="text-red-600" />
            <span className="text-[10px] text-black">{t('terms')}</span>
          </GlassCard>
          <GlassCard className="p-4 flex flex-col items-center gap-2 cursor-pointer border border-slate-100 dark:border-slate-800">
            <ShieldAlert className="text-red-600" />
            <span className="text-[10px] text-black">{t('privacy')}</span>
          </GlassCard>
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full glass-card p-4 flex items-center gap-4 text-red-600 hover:bg-red-500/5 border border-slate-100 dark:border-slate-800"
        >
          <LogOut />
          <span className="flex-1 ltr:text-left rtl:text-right">{t('logout')}</span>
        </button>
      </div>
    </motion.div>
  );
};

const EditProfilePage = ({ setView, t }: { setView: (v: View) => void, t: (k: string) => string, key?: any }) => {
  const [name, setName] = useState(t('user_name'));
  const [email, setEmail] = useState('ahmed@example.com');
  const [phone, setPhone] = useState('0501234567');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('profile')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-black">{t('edit_profile')}</h2>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 glass rounded-full p-1 border border-slate-200 dark:border-slate-800">
            <img 
              src="https://picsum.photos/seed/user/200/200" 
              className="w-full h-full object-cover rounded-full" 
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-red-600 text-white rounded-full shadow-lg">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-black mb-1 mx-2">{t('full_name')}</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full glass-input"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-black mb-1 mx-2">{t('email')}</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full glass-input"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-black mb-1 mx-2">{t('phone')}</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="w-full glass-input text-left"
            dir="ltr"
          />
        </div>
        
        <button 
          onClick={() => setView('profile')}
          className="w-full glass-button mt-8"
        >
          {t('save_changes')}
        </button>
      </div>
    </motion.div>
  );
};

const PaymentPage = ({ total, onComplete, setView, formatPrice, t }: { total: number, onComplete: (transactionId: string, note: string) => void, setView: (v: View) => void, formatPrice: (p: number) => string, t: (k: string) => string, key?: any }) => {
  const [transactionId, setTransactionId] = useState('');
  const [note, setNote] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('cart')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-black">{t('payment_method')}</h2>
      </div>

      <div className="glass rounded-3xl p-6 border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-black">{t('amount_required')}</span>
          <span className="text-xl font-bold text-red-600">{formatPrice(total)}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1 mx-2">{t('transaction_id')}</label>
            <input 
              type="text" 
              placeholder={t('transaction_id_placeholder') || "123456789"}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full glass-input"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1 mx-2">{t('additional_notes')}</label>
            <textarea 
              placeholder={t('notes_placeholder') || "..."}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full glass-input min-h-[100px] resize-none"
            />
          </div>
        </div>
      </div>

      <div className="p-4 glass rounded-2xl border border-blue-100 bg-blue-50/30 mb-8">
        <p className="text-xs text-blue-600 leading-relaxed">
          {t('payment_instruction')}
        </p>
      </div>

      <button 
        onClick={() => {
          if (!transactionId) {
            alert(t('enter_transaction_id') || 'Please enter transaction ID');
            return;
          }
          onComplete(transactionId, note);
        }}
        className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-600/20 active:scale-95 transition-transform"
      >
        {t('confirm_order')}
      </button>
    </motion.div>
  );
};

// --- Main App ---

const ContactPage = ({ setView, t }: { setView: (v: View) => void, t: (k: string) => string, key?: any }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('message_sent'));
    setView('profile');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-32 pt-12 px-6"
    >
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('profile')} className="p-2 glass rounded-full text-black">
          <ChevronLeft size={24} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <h2 className="text-2xl font-bold text-black">{t('contact_us')}</h2>
      </div>

      <GlassCard className="p-6 border border-slate-100 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1 mx-2">{t('full_name')}</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-input"
              placeholder={t('full_name')}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1 mx-2">{t('email')}</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass-input"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1 mx-2">{t('message') || 'الرسالة'}</label>
            <textarea 
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full glass-input min-h-[150px] resize-none"
              placeholder={t('contact_placeholder')}
            />
          </div>
          <button type="submit" className="w-full glass-button mt-4">
            {t('send_message')}
          </button>
        </form>
      </GlassCard>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <GlassCard className="p-4 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 mb-2">
            <Globe size={20} />
          </div>
          <span className="text-[10px] font-bold text-black">www.smart-electric.com</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center text-red-600 mb-2">
            <MessageSquare size={20} />
          </div>
          <span className="text-[10px] font-bold text-black">+966 50 123 4567</span>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('welcome');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('light');
  const [currency, setCurrency] = useState('SAR');
  const [role, setRole] = useState<UserRole>('viewer');

  useEffect(() => {
    // Apply theme
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      if (systemTheme === 'dark') root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Apply language direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const formatPrice = (priceInSAR: number) => {
    if (currency === 'USD') return `${(priceInSAR / 3.75).toFixed(2)} $`;
    if (currency === 'YER') return `${(priceInSAR * 66).toFixed(0)} YER`;
    return `${priceInSAR} ر.س`;
  };

  const t = (key: string) => TRANSLATIONS[language][key] || key;
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-1234', 
      date: '2024-03-10', 
      status: 'shipping', 
      total: 450, 
      items: [{ productId: 'switch-1', quantity: 2 }],
      customerInfo: { name: 'فهد العامري', email: 'fahad@example.com', phone: '0551234567', address: 'الرياض، العليا' }
    },
    { 
      id: 'ORD-1235', 
      date: '2024-03-08', 
      status: 'delivered', 
      total: 120, 
      items: [{ productId: 'solar-1', quantity: 1 }],
      customerInfo: { name: 'سارة خالد', email: 'sara@example.com', phone: '0567890123', address: 'جدة، الحمراء' }
    },
    { 
      id: 'ORD-1236', 
      date: '2024-03-05', 
      status: 'cancelled', 
      total: 85, 
      items: [{ productId: 'timer-1', quantity: 3 }],
      customerInfo: { name: 'محمد علي', email: 'mohammed@example.com', phone: '0543210987', address: 'الدمام، الشاطئ' }
    },
  ]);

  const completeOrder = (transactionId: string, note: string) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shippingCost = subtotal > 0 ? 25 : 0;
    const total = subtotal + shippingCost;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: total,
      items: cart.map(item => ({ productId: item.product.id, quantity: item.quantity }))
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setView('orders');
    alert(`${t('order_success')} ${newOrder.id}. ${t('review_notice')} (${t('transaction_id')}: ${transactionId})`);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(t('update_status'));
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(product.id);
      if (isFavorite) {
        toast(t('removed_from_favorites'), { icon: <Heart size={16} /> });
        return prev.filter(id => id !== product.id);
      } else {
        toast.success(t('added_to_favorites'), { icon: <Heart size={16} className="fill-red-600 text-red-600" /> });
        return [...prev, product.id];
      }
    });
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      toast.success(t('added_to_cart'), {
        description: product.name,
        icon: <ShoppingCart size={16} />
      });
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleEnter = () => {
    setIsLoggedIn(true);
    setView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('welcome');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-x-hidden text-black">
      <Toaster position="top-center" richColors />
      {/* Background blobs for Glassmorphism effect */}
      <div className="fixed top-[-10%] right-[-10%] w-64 h-64 bg-blue-500/30 rounded-full blur-[100px] -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-500/30 rounded-full blur-[100px] -z-10" />

      <AnimatePresence mode="wait">
        {view === 'welcome' && <WelcomePage key="welcome" onEnter={handleEnter} t={t} setRole={setRole} currentRole={role} />}
        {view === 'home' && (
          <HomePage 
            key="home" 
            setView={setView} 
            setSelectedProduct={setSelectedProduct} 
            setQuickViewProduct={setQuickViewProduct}
            addToCart={addToCart}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            formatPrice={formatPrice}
            t={t}
          />
        )}
        {view === 'categories' && (
          <CategoriesPage 
            key="categories" 
            setView={setView} 
            setSelectedProduct={setSelectedProduct} 
            setQuickViewProduct={setQuickViewProduct}
            addToCart={addToCart}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            formatPrice={formatPrice}
            t={t}
          />
        )}
        {view === 'cart' && (
          <CartPage 
            key="cart" 
            setView={setView} 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity} 
            formatPrice={formatPrice}
            t={t}
          />
        )}
        {view === 'favorites' && (
          <FavoritesPage 
            key="favorites" 
            setView={setView} 
            setSelectedProduct={setSelectedProduct} 
            setQuickViewProduct={setQuickViewProduct}
            addToCart={addToCart}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            formatPrice={formatPrice}
            t={t}
          />
        )}
        {view === 'orders' && <OrdersPage orders={orders} t={t} formatPrice={formatPrice} setView={setView} />}
        {view === 'payment' && (
          <PaymentPage 
            total={cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) + (cart.length > 0 ? 25 : 0)} 
            onComplete={completeOrder}
            setView={setView}
            formatPrice={formatPrice}
            t={t}
          />
        )}
        {view === 'profile' && (
          <ProfilePage 
            key="profile" 
            onLogout={handleLogout} 
            setView={setView}
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            setTheme={setTheme}
            currency={currency}
            setCurrency={setCurrency}
            t={t}
          />
        )}
        {view === 'contact' && <ContactPage key="contact" setView={setView} t={t} />}
        {view === 'edit-profile' && <EditProfilePage key="edit-profile" setView={setView} t={t} />}
        {view === 'admin-dashboard' && <AdminDashboard key="admin-dashboard" setView={setView} t={t} formatPrice={formatPrice} role={role} />}
        {view === 'admin-orders' && (
          <AdminOrdersPage 
            key="admin-orders" 
            orders={orders} 
            updateOrderStatus={updateOrderStatus} 
            t={t} 
            formatPrice={formatPrice} 
            setView={setView} 
            role={role} 
          />
        )}
        {view === 'request-engineer' && <RequestEngineerPage key="request-engineer" setView={setView} t={t} />}
        {view === 'product-detail' && selectedProduct && (
          <ProductDetailPage 
            key="product-detail" 
            product={selectedProduct} 
            setView={setView} 
            addToCart={addToCart}
            formatPrice={formatPrice}
            t={t}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={addToCart}
            formatPrice={formatPrice}
            t={t}
          />
        )}
      </AnimatePresence>

      {view !== 'welcome' && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('request-engineer')}
          className="fixed bottom-24 ltr:right-6 rtl:left-6 w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-600/40 z-[60] border-4 border-white dark:border-slate-900 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <motion.div
            animate={{ rotate: view === 'request-engineer' ? 45 : 0 }}
            className="relative z-10"
          >
            <Wrench size={24} />
          </motion.div>
          
          {/* Tooltip Label */}
          <div className="absolute ltr:right-full rtl:left-full mx-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {t('request_engineer')}
          </div>
        </motion.button>
      )}

      {view !== 'welcome' && (
        <Navbar currentView={view} setView={setView} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} t={t} />
      )}
    </div>
  );
}
