import i18next from 'i18next';
import EnglishLanguage from '../../../build/locales/en.json';
import ChineseLanguage from '../../../build/locales/ch.json';

const resources = { ...EnglishLanguage, ...ChineseLanguage };

const getLanguage = () => {
  if (!localStorage.getItem('Language')) {
    localStorage.setItem('Language', 'English_en');
  }
  const language = localStorage.getItem('Language');
  const lng = language.slice(language.search('_') + 1);

  return lng;
};

const init = (callback) => {
  i18next.init({
    lng: getLanguage(),
    keySeparator: false,
    resources,
    interpolation: {
      prefix: '{',
      suffix: '}',
    },
  }, callback);
};

const translate = (id, values) => {
  const translation = i18next.t(id, values) || id;

  // if (translation === id) {
  //   console.warn(`ID ${id} has no translation!`);
  // }

  return translation;
};

export default { init, translate, getLanguage };
