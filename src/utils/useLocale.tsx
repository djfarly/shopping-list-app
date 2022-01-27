import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { UpdateState } from 'use-local-storage-state/src/useLocalStorageStateBase';
import { LocaleName, LocaleNames } from './types';
import locales, { localeNames } from '../locales';

type TranslationString = keyof typeof locales.de | keyof typeof locales.en;

const LocaleContext = createContext<{
  locale: LocaleName;
  setLocale: UpdateState<LocaleName>;
  localeNames: LocaleNames;
}>({ locale: 'de', setLocale: () => {}, localeNames });

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorageState<LocaleName>('locale', 'de');
  const contextValue = useMemo(
    () => ({ locale, setLocale, localeNames }),
    [locale, setLocale]
  );
  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslate() {
  const { locale } = useLocale();
  return function t(translationString: TranslationString) {
    const internalTranslationString =
      translationString as keyof typeof locales[LocaleName];
    return locales[locale][internalTranslationString] ?? translationString;
  };
}
