import styled from 'styled-components';
import { Search } from './Components/Search';
import { Stack } from './Components/Stack';
import { LocaleProvider } from './utils/useLocale';
import { ItemProvider } from './utils/useItems';
import { ShoppingList } from './Components/ShoppingList';

const Container = styled.main`
  max-width: 30rem;
  padding: 1.5rem 0.75rem;
  margin: 0 auto;
`;

export default function App() {
  return (
    <LocaleProvider>
      <ItemProvider>
        <Container>
          <Stack space="4rem">
            <ShoppingList />
            <Search />
          </Stack>
        </Container>
      </ItemProvider>
    </LocaleProvider>
  );
}
