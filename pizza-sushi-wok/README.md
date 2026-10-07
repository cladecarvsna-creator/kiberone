# 🍕 Пицца Суши Вок

Мобильное приложение доставки еды на React Native (Expo). Шрифт Unbounded, жёлтый акцент #FFC700.

| Приветствие | Меню | Настройки | Мои заказы |
| --- | --- | --- | --- |
| ![](screenshots/welcome.png) | ![](screenshots/menu.png) | ![](screenshots/settings.png) | ![](screenshots/orders.png) |

## Запуск

```bash
cd pizza-sushi-wok
npm install
npx expo start
```

Отсканируй QR-код приложением **Expo Go** на телефоне или нажми `w`, чтобы открыть в браузере.

## Android APK

Готовый APK собирается в GitHub Actions (`.github/workflows/pizza-sushi-wok-android.yml`) на каждый пуш и выкладывается в релиз
[android-latest](https://github.com/cladecarvsna-creator/kiberone/releases/tag/android-latest).
Открой ссылку на телефоне, скачай `pizza-sushi-wok.apk` и установи (Андроид попросит разрешить установку из неизвестных источников).

## Структура

- `App.tsx` — шрифты, переключение между приветствием и экранами с таб-баром
- `src/screens/` — экраны: `WelcomeScreen`, `MenuScreen`, `SettingsScreen`, `OrdersScreen`
- `src/components/TabBar.tsx` — нижний таб-бар (активный — жёлтый, неактивные — чёрные)
- `src/data.ts` — товары и заказы
- `src/theme.ts` — цвета и шрифты

## Проверка

```bash
npm run typecheck   # проверка типов
npm run build:web   # сборка веб-версии в dist/
```

Та же проверка запускается в GitHub Actions (`.github/workflows/pizza-sushi-wok.yml`).
