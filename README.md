# 🗺️ Map Lover

Modern ve kullanıcı dostu bir React Native harita uygulaması. Expo ile geliştirilmiş, çoklu platform desteği sunan interaktif bir konum ve harita yönetim uygulaması.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Proje Yapısı](#-proje-yapısı)
- [Kullanım](#-kullanım)
- [Geliştirme](#-geliştirme)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

## ✨ Özellikler

- 🗺️ **İnteraktif Harita Görünümü**: Kullanıcı dostu harita arayüzü
- 📍 **Konum İşaretleme**: Harita üzerinde özel işaretleyiciler ekleme
- 🎯 **Konum Takibi**: Gerçek zamanlı konum izleme
- 💾 **Veri Yönetimi**: Zustand ile merkezi state yönetimi
- 🎨 **Modern UI**: NativeWind (Tailwind CSS) ile şık ve responsive tasarım
- 🔄 **React Navigation**: Sorunsuz sayfa geçişleri
- 📱 **Çoklu Platform**: iOS ve Android desteği
- ⚡ **Yüksek Performans**: Optimize edilmiş render ve state yönetimi

## 🛠️ Teknolojiler

### Core
- **React Native**: Mobil uygulama geliştirme framework'ü
- **Expo**: React Native geliştirme platformu
- **TypeScript**: Tip güvenli JavaScript

### State Management & Navigation
- **Zustand**: Hafif ve modern state management
- **React Navigation**: Native navigation çözümü

### Styling & UI
- **NativeWind**: Tailwind CSS for React Native
- **Tailwind CSS**: Utility-first CSS framework

### Maps & Location
- **React Native Maps**: Harita entegrasyonu
- **Expo Location**: Konum servisleri

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Babel**: JavaScript derleyici
- **Metro**: React Native bundler

## 🚀 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS için: Xcode (macOS)
- Android için: Android Studio

### Adım Adım Kurulum

1. **Repository'yi Klonlayın**
```bash
git clone https://github.com/js-lover/map-lover.git
cd map-lover
```

2. **Bağımlılıkları Yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Uygulamayı Başlatın**
```bash
# Expo geliştirme sunucusunu başlat
npm start
# veya
expo start

# iOS için
npm run ios
# veya
expo run:ios

# Android için
npm run android
# veya
expo run:android
```

## 📁 Proje Yapısı

```
map-lover/
├── app/                    # Uygulama sayfaları ve rotalar
├── assets/                 # Görseller, fontlar ve statik dosyalar
├── components/             # Yeniden kullanılabilir UI bileşenleri
├── constants/              # Sabit değerler ve konfigürasyonlar
├── data/                   # Statik veri ve mock data
├── hooks/                  # Custom React hooks
├── lib/                    # Yardımcı fonksiyonlar ve utilities
├── providers/              # Context providers
├── services/               # API servisleri ve external servisler
├── store/                  # Zustand store yapılandırmaları
├── app.config.js          # Expo app configuration
├── babel.config.js        # Babel configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Proje bağımlılıkları

```

### Klasör Açıklamaları

- **`app/`**: Expo Router ile sayfa yönlendirmesi ve ekran bileşenleri
- **`components/`**: Button, Card, MapView gibi yeniden kullanılabilir UI bileşenleri
- **`constants/`**: Renk paleti, tema değerleri, API endpoints
- **`data/`**: Mock data, örnek konum verileri
- **`hooks/`**: useLocation, useMapRegion gibi custom hooks
- **`lib/`**: Yardımcı fonksiyonlar, format işlemleri
- **`providers/`**: Theme, Auth gibi context providers
- **`services/`**: Harici API çağrıları, location servisleri
- **`store/`**: Zustand ile merkezi state yönetimi

## 💻 Kullanım

### Temel Kullanım

```typescript
import { MapView } from './components/MapView';

function App() {
  return (
    <MapView
      initialRegion={{
        latitude: 41.0082,
        longitude: 28.9784,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
}
```

### State Management ile Kullanım

```typescript
import { useMapStore } from './store/mapStore';

function LocationScreen() {
  const { currentLocation, setLocation } = useMapStore();
  
  const updateLocation = (lat: number, lng: number) => {
    setLocation({ latitude: lat, longitude: lng });
  };
  
  return (
    // Component JSX
  );
}
```

## 🔧 Geliştirme

### Development Komutları

```bash
# Geliştirme sunucusunu başlat
npm start

# iOS simülatörde çalıştır
npm run ios

# Android emülatörde çalıştır
npm run android

# Web'de çalıştır
npm run web

# Linting
npm run lint

# Format kodları
npm run format

# TypeScript tip kontrolü
npm run type-check
```

### Konfigürasyon Dosyaları

- **`app.config.js`**: Expo uygulama ayarları
- **`babel.config.js`**: Babel transpiler ayarları
- **`tailwind.config.js`**: Tailwind CSS tema ve eklenti ayarları
- **`tsconfig.json`**: TypeScript derleyici ayarları
- **`eslint.config.js`**: ESLint kuralları
- **`metro.config.js`**: Metro bundler ayarları

### Environment Variables

`.env` dosyası oluşturun ve gerekli API anahtarlarını ekleyin:

```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here
```

## 🧪 Testing

```bash
# Unit testleri çalıştır
npm test

# Test coverage
npm run test:coverage

# E2E testler
npm run test:e2e
```

## 📦 Build & Deploy

### Production Build

```bash
# EAS Build ile iOS build
eas build --platform ios

# EAS Build ile Android build
eas build --platform android

# Her iki platform için
eas build --platform all
```

### Local Build

```bash
# iOS için local build
expo run:ios --configuration Release

# Android için local build
expo run:android --variant release
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen aşağıdaki adımları izleyin:

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Commit Mesaj Kuralları

Conventional Commits standardını kullanıyoruz:

- `feat:` Yeni özellik
- `fix:` Bug düzeltmesi
- `docs:` Dokümantasyon değişiklikleri
- `style:` Kod formatı değişiklikleri
- `refactor:` Kod refactoring
- `test:` Test ekleme/düzeltme
- `chore:` Build/config değişiklikleri

## 📱 Ekran Görüntüleri

<!-- Buraya uygulama ekran görüntülerini ekleyin -->

## 🐛 Bilinen Sorunlar

- [ ] iOS'ta bazı durumlarda konum izni sorunu
- [ ] Android'de ilk açılışta harita render gecikmesi

## 📝 Changelog

Değişiklik geçmişi için [CHANGELOG.md](CHANGELOG.md) dosyasına bakın.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**js-lover**
- GitHub: [@js-lover](https://github.com/js-lover)

## 🙏 Teşekkürler

- React Native topluluğuna
- Expo ekibine
- Tüm katkıda bulunanlara

## 📞 İletişim

Sorularınız veya önerileriniz için:
- GitHub Issues: [Yeni Issue Aç](https://github.com/js-lover/map-lover/issues)
- Email: [İletişim bilgisi]

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
