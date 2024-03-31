import { I18n } from "i18n-js";
import en from "../../constants//languages/en.json";
import langs from "../../constants//languages/langs.json";
import fr from "../../constants//languages/fr.json";

const i18n = new I18n(langs);

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

export default i18n;