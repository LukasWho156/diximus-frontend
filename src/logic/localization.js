import de from '../assets/localizations/de.json';
import en from '../assets/localizations/en.json';

const languages = {
    de: { name: 'Deutsch', translations: de },
    en: { name: 'English', translations: en },
}

const availableLanguages = Object.keys(languages);

class Localization {

    language;

    get defaultLanguage() {
        return window.navigator.language.split('-')[0];
    }

    get currentLanguage() {
        return this.language;
    }

    get availableLanguages() {
        return availableLanguages.map(e => ({ name: languages[e].name, code: e}));
    }
    
    constructor(language) {
        this.setLanguage(language ?? this.defaultLanguage)
    }

    setLanguage(language) {
        if(!availableLanguages.find(e => e === language)) {
            this.language = 'en';
            return;
        }
        this.language = language;
    }

    localize(key, ...replacements) {
        let message = languages[this.language]?.translations[key] ?? languages['en'].translations[key];
        for(let i = 0; i < replacements.length; i++) {
            message = message.replace(`{${i}}`, replacements[i])
        }
        return message;
    }

    localizeObject(object) {
        return object[this.language] ?? object['en'];
    }

}

export default Localization