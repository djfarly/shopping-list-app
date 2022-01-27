import styled from 'styled-components';
import { useLocale } from '../utils/useLocale';

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const LocaleButton = styled.button``;

export function LocaleSelector() {
  const { locale: currentLocale, setLocale, localeNames } = useLocale();
  return (
    <Container>
      {localeNames.map(locale => (
        <LocaleButton
          onClick={() => setLocale(locale)}
          key={locale}
          disabled={locale === currentLocale}
        >
          {locale.toLocaleUpperCase()}
        </LocaleButton>
      ))}
    </Container>
  );
}
