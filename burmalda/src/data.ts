export const SLOGAN = 'Бурмалда не тот кто бурмалдит, а тот кто бурмалдит красиво';

export type Category = 'all' | 'classic' | 'life' | 'school' | 'money' | 'stream';

export const categories: { key: Category; label: string }[] = [
  { key: 'all', label: '🔥 Все' },
  { key: 'classic', label: '👑 Классика' },
  { key: 'life', label: '🕺 Жиза' },
  { key: 'school', label: '📚 Школа' },
  { key: 'money', label: '💸 Деньги' },
  { key: 'stream', label: '🎥 Стрим' },
];

export type Meme = {
  id: string;
  emoji: string;
  title: string;
  text: string;
  category: Exclude<Category, 'all'>;
  colors: readonly [string, string];
};

const grad = {
  gold: ['#FFD23F', '#FF9F1C'] as const,
  pink: ['#FF4FD8', '#7B2FF7'] as const,
  ocean: ['#2FD3F7', '#3A5BFF'] as const,
  lime: ['#B6F23F', '#1FAA59'] as const,
  fire: ['#FF6B3D', '#E0115F'] as const,
  night: ['#A89BFF', '#6A4BF0'] as const,
};

export const memes: Meme[] = [
  {
    id: 'm1',
    emoji: '👑',
    title: 'Главное правило',
    text: 'Бурмалда не тот кто бурмалдит, а тот кто бурмалдит красиво.',
    category: 'classic',
    colors: grad.gold,
  },
  {
    id: 'm2',
    emoji: '🕺',
    title: 'Состояние души',
    text: 'Бурмалда это не событие. Бурмалда это состояние души.',
    category: 'classic',
    colors: grad.pink,
  },
  {
    id: 'm3',
    emoji: '😎',
    title: 'Меллстрой стайл',
    text: 'Когда зашёл в комнату, а все уже знают: сейчас начнётся бурмалда.',
    category: 'classic',
    colors: grad.night,
  },
  {
    id: 'm4',
    emoji: '📈',
    title: 'Уровень бурмалды',
    text: 'Новичок бурмалдит по пятницам. Профи бурмалдит даже в понедельник утром.',
    category: 'classic',
    colors: grad.fire,
  },
  {
    id: 'm5',
    emoji: '🪩',
    title: 'Диско',
    text: 'Музыка ещё не включилась, а я уже на бурмалде.',
    category: 'life',
    colors: grad.pink,
  },
  {
    id: 'm6',
    emoji: '🛋️',
    title: 'Тихая бурмалда',
    text: 'Бурмалда интроверта: чипсы, сериал и никто не звонит.',
    category: 'life',
    colors: grad.ocean,
  },
  {
    id: 'm7',
    emoji: '🍕',
    title: 'Пятница',
    text: 'Пицца приехала. Объявляю бурмалду открытой.',
    category: 'life',
    colors: grad.gold,
  },
  {
    id: 'm8',
    emoji: '😴',
    title: 'Утро после',
    text: 'Вчера была бурмалда. Сегодня бурмалда отдыхает. Я тоже.',
    category: 'life',
    colors: grad.night,
  },
  {
    id: 'm9',
    emoji: '🧦',
    title: 'Дресс-код',
    text: 'Носки разного цвета это не ошибка. Это бурмалда-стиль.',
    category: 'life',
    colors: grad.lime,
  },
  {
    id: 'm10',
    emoji: '📚',
    title: 'Домашка',
    text: 'Сделал домашку за 5 минут до звонка. Это и есть бурмалда красиво.',
    category: 'school',
    colors: grad.ocean,
  },
  {
    id: 'm11',
    emoji: '🔔',
    title: 'Звонок',
    text: 'Учитель: звонок для учителя. Весь класс мысленно уже на бурмалде.',
    category: 'school',
    colors: grad.fire,
  },
  {
    id: 'm12',
    emoji: '🧮',
    title: 'Контрольная',
    text: 'Списал у соседа, а у соседа тоже неправильно. Бурмалда командная.',
    category: 'school',
    colors: grad.lime,
  },
  {
    id: 'm13',
    emoji: '🎒',
    title: 'Каникулы',
    text: 'Последний урок перед каникулами: официальный старт сезона бурмалды.',
    category: 'school',
    colors: grad.gold,
  },
  {
    id: 'm14',
    emoji: '💻',
    title: 'КиберШкола',
    text: 'Написал код с первого раза и он заработал. Срочно бурмалдить, пока не сломался.',
    category: 'school',
    colors: grad.night,
  },
  {
    id: 'm15',
    emoji: '💸',
    title: 'Карманные',
    text: 'Получил карманные: 5 минут чувствовал себя Меллстроем.',
    category: 'money',
    colors: grad.lime,
  },
  {
    id: 'm16',
    emoji: '🪙',
    title: 'Бюджет',
    text: 'Бюджет на бурмалду: 50 рублей и бесконечная харизма.',
    category: 'money',
    colors: grad.gold,
  },
  {
    id: 'm17',
    emoji: '🏦',
    title: 'Копилка',
    text: 'Копилка: копила весь год. Бурмалда: держи моё пиво. То есть сок.',
    category: 'money',
    colors: grad.fire,
  },
  {
    id: 'm18',
    emoji: '🧃',
    title: 'Шиканул',
    text: 'Купил два сока вместо одного. Шиканул, бурмалда красиво.',
    category: 'money',
    colors: grad.ocean,
  },
  {
    id: 'm19',
    emoji: '🎥',
    title: 'Стрим начался',
    text: 'Чат, всем привет! Сегодня у нас бурмалда в прямом эфире.',
    category: 'stream',
    colors: grad.pink,
  },
  {
    id: 'm20',
    emoji: '💬',
    title: 'Чат',
    text: 'Чат пишет «БУРМАЛДА» капсом быстрее, чем стример успевает читать.',
    category: 'stream',
    colors: grad.night,
  },
  {
    id: 'm21',
    emoji: '🎁',
    title: 'Розыгрыш',
    text: 'Ждал розыгрыш весь стрим. Выиграл кто-то другой. Бурмалда это про участие.',
    category: 'stream',
    colors: grad.gold,
  },
  {
    id: 'm22',
    emoji: '📡',
    title: 'Интернет',
    text: 'Интернет лагает ровно в момент, когда на стриме начинается бурмалда.',
    category: 'stream',
    colors: grad.fire,
  },
  {
    id: 'm23',
    emoji: '🐐',
    title: 'Легенда',
    text: 'Бурмалдить может каждый. Бурмалдить красиво может только легенда.',
    category: 'classic',
    colors: grad.lime,
  },
  {
    id: 'm24',
    emoji: '🚀',
    title: 'Мотивация',
    text: 'Сначала дела, потом бурмалда. Но красиво можно и то, и другое.',
    category: 'life',
    colors: grad.ocean,
  },
];

export const randomReactions = ['БУРМАЛДА!', 'Красиво!', 'Легендарно 👑', 'Это база', 'Жиза 💯', 'Бурмалдим 🕺'];
