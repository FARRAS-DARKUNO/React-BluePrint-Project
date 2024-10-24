import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend) // Memuat file JSON terjemahan
    .use(LanguageDetector) // Mendeteksi bahasa yang digunakan
    .use(initReactI18next) // Menginisialisasi dengan React
    .init({
        lng: 'Idn', // Bahasa default
        fallbackLng: 'Eng', // Bahasa default
        debug: true, // Untuk debugging
        interpolation: {
            escapeValue: false, // React sudah aman dari XSS
        },
        backend: {
            loadPath: '/public/{{lng}}/translation.json', // Path file terjemahan
        },
    });

export default i18n;
