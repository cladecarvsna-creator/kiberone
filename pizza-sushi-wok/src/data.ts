export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

export const pizzas: Product[] = [
  { id: 'pepperoni', name: 'Пепперони', description: 'Пикантная пепперони, моцарелла, томатный соус', price: 250, emoji: '🍕' },
  { id: 'margherita', name: 'Маргарита', description: 'Томаты, моцарелла, базилик, томатный соус', price: 220, emoji: '🍕' },
  { id: 'four-cheese', name: '4 сыра', description: 'Моцарелла, пармезан, дор блю, чеддер', price: 290, emoji: '🍕' },
  { id: 'hawaiian', name: 'Гавайская', description: 'Курица, ананасы, моцарелла, сливочный соус', price: 260, emoji: '🍕' },
];

export const rolls: Product[] = [
  { id: 'philadelphia', name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец', price: 320, emoji: '🍣' },
  { id: 'california', name: 'Калифорния', description: 'Краб, авокадо, огурец, икра тобико', price: 280, emoji: '🍣' },
  { id: 'dragon', name: 'Дракон', description: 'Угорь, авокадо, унаги соус, кунжут', price: 350, emoji: '🍣' },
  { id: 'spicy-salmon', name: 'Спайси лосось', description: 'Лосось, острый соус, огурец, зелёный лук', price: 300, emoji: '🍣' },
];

export const products = [...pizzas, ...rolls];

export type CartLine = { productId: string; qty: number };

export type OrderStatus = 'cooking' | 'onTheWay' | 'delivered';

export type Order = {
  id: string;
  number: string;
  status: OrderStatus;
  lines: CartLine[];
  total: number;
  time: string;
};

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function linesTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (findProduct(l.productId)?.price ?? 0) * l.qty, 0);
}

export const initialOrders: Order[] = [
  {
    id: '1042',
    number: '№1042',
    status: 'cooking',
    lines: [
      { productId: 'pepperoni', qty: 1 },
      { productId: 'philadelphia', qty: 2 },
    ],
    total: 890,
    time: 'Сегодня, 18:40',
  },
  {
    id: '1039',
    number: '№1039',
    status: 'onTheWay',
    lines: [
      { productId: 'four-cheese', qty: 1 },
      { productId: 'california', qty: 1 },
    ],
    total: 570,
    time: 'Сегодня, 18:05',
  },
  {
    id: '1021',
    number: '№1021',
    status: 'delivered',
    lines: [
      { productId: 'margherita', qty: 2 },
      { productId: 'dragon', qty: 1 },
    ],
    total: 790,
    time: 'Вчера, 20:15',
  },
  {
    id: '998',
    number: '№0998',
    status: 'delivered',
    lines: [
      { productId: 'hawaiian', qty: 1 },
      { productId: 'spicy-salmon', qty: 1 },
    ],
    total: 560,
    time: '3 октября, 19:30',
  },
];

export type Settings = {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryMethod: string;
  deliveryTime: string;
  paymentMethod: string;
  card: string;
  notifications: boolean;
  darkMode: boolean;
  language: string;
};

export const defaultSettings: Settings = {
  name: 'Иван',
  phone: '+7 900 123-45-67',
  email: 'ivan@mail.ru',
  address: 'ул. Ленина, 10',
  deliveryMethod: 'Курьер',
  deliveryTime: 'Как можно скорее',
  paymentMethod: 'Картой',
  card: '4242',
  notifications: true,
  darkMode: false,
  language: 'Русский',
};

export type SettingKey = keyof Settings;

export type SettingField =
  | { key: SettingKey; label: string; kind: 'text'; keyboard?: 'default' | 'phone-pad' | 'email-address' | 'number-pad'; placeholder: string }
  | { key: SettingKey; label: string; kind: 'choice'; options: string[] }
  | { key: SettingKey; label: string; kind: 'toggle' };

export const settingSections: { title: string; fields: SettingField[] }[] = [
  {
    title: 'Профиль',
    fields: [
      { key: 'name', label: 'Имя', kind: 'text', placeholder: 'Как к вам обращаться' },
      { key: 'phone', label: 'Телефон', kind: 'text', keyboard: 'phone-pad', placeholder: '+7 900 000-00-00' },
      { key: 'email', label: 'Email', kind: 'text', keyboard: 'email-address', placeholder: 'you@mail.ru' },
    ],
  },
  {
    title: 'Доставка',
    fields: [
      { key: 'address', label: 'Адрес', kind: 'text', placeholder: 'Улица, дом, квартира' },
      { key: 'deliveryMethod', label: 'Способ', kind: 'choice', options: ['Курьер', 'Самовывоз'] },
      {
        key: 'deliveryTime',
        label: 'Время',
        kind: 'choice',
        options: ['Как можно скорее', 'Через 1 час', 'Через 2 часа', 'Вечером, 19:00–21:00'],
      },
    ],
  },
  {
    title: 'Оплата',
    fields: [
      { key: 'paymentMethod', label: 'Способ', kind: 'choice', options: ['Картой', 'Наличными', 'СБП'] },
      { key: 'card', label: 'Карта', kind: 'text', keyboard: 'number-pad', placeholder: 'Номер карты' },
    ],
  },
  {
    title: 'Приложение',
    fields: [
      { key: 'notifications', label: 'Уведомления', kind: 'toggle' },
      { key: 'darkMode', label: 'Тёмная тема', kind: 'toggle' },
      { key: 'language', label: 'Язык', kind: 'choice', options: ['Русский', 'English'] },
    ],
  },
];

export function displayValue(key: SettingKey, settings: Settings) {
  if (key === 'card') return settings.card ? `•••• ${settings.card}` : 'Не указана';
  const v = settings[key];
  if (typeof v === 'boolean') return v ? 'Вкл' : 'Выкл';
  return v || 'Не указано';
}
