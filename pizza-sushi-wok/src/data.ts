export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const pizzas: Product[] = [
  { id: 'pepperoni', name: 'Пепперони', description: 'Пикантная пепперони, моцарелла, томатный соус', price: 250 },
  { id: 'margherita', name: 'Маргарита', description: 'Томаты, моцарелла, базилик, томатный соус', price: 220 },
  { id: 'four-cheese', name: '4 сыра', description: 'Моцарелла, пармезан, дор блю, чеддер', price: 290 },
  { id: 'hawaiian', name: 'Гавайская', description: 'Курица, ананасы, моцарелла, сливочный соус', price: 260 },
];

export const rolls: Product[] = [
  { id: 'philadelphia', name: 'Филадельфия', description: 'Лосось, сливочный сыр, огурец', price: 320 },
  { id: 'california', name: 'Калифорния', description: 'Краб, авокадо, огурец, икра тобико', price: 280 },
  { id: 'dragon', name: 'Дракон', description: 'Угорь, авокадо, унаги соус, кунжут', price: 350 },
  { id: 'spicy-salmon', name: 'Спайси лосось', description: 'Лосось, острый соус, огурец, зелёный лук', price: 300 },
];

export type OrderStatus = 'cooking' | 'onTheWay' | 'delivered';

export type Order = {
  id: string;
  number: string;
  status: OrderStatus;
  items: string[];
  total: number;
  time: string;
};

export const orders: Order[] = [
  {
    id: '1',
    number: '№1042',
    status: 'cooking',
    items: ['Пепперони × 1', 'Филадельфия × 2'],
    total: 890,
    time: 'Сегодня, 18:40',
  },
  {
    id: '2',
    number: '№1039',
    status: 'onTheWay',
    items: ['4 сыра × 1', 'Калифорния × 1'],
    total: 570,
    time: 'Сегодня, 18:05',
  },
  {
    id: '3',
    number: '№1021',
    status: 'delivered',
    items: ['Маргарита × 2', 'Дракон × 1'],
    total: 790,
    time: 'Вчера, 20:15',
  },
  {
    id: '4',
    number: '№0998',
    status: 'delivered',
    items: ['Гавайская × 1', 'Спайси лосось × 1'],
    total: 560,
    time: '3 октября, 19:30',
  },
];
