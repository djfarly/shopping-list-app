import styled from 'styled-components';
import { Item } from './Item';
import { ItemList } from './ItemList';
import { Collapsible } from './Collapsible';
import { Stack } from './Stack';
import { useItems } from '../utils/useItems';
import { useLocale, useTranslate } from '../utils/useLocale';
import { LocaleSelector } from './LocaleSelector';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export function ShoppingList() {
  const { filteredCategories, groupedActiveItems, handleSelectActiveItem } =
    useItems();
  const { locale } = useLocale();
  const t = useTranslate();

  return (
    <Stack space="2rem">
      <Header>
        <h1>{t('ShoppingList.title')}</h1>
        <LocaleSelector />
      </Header>
      <Stack>
        {filteredCategories.length ? (
          filteredCategories.map(category => {
            const items = groupedActiveItems[category._id];
            return (
              <Collapsible title={category.name[locale]} key={category._id}>
                <ItemList>
                  {items.map(item => (
                    <Item
                      key={item._id}
                      type="active"
                      onSelect={handleSelectActiveItem}
                      item={item}
                    />
                  ))}
                </ItemList>
              </Collapsible>
            );
          })
        ) : (
          <p>{t('ShoppingList.empty')}</p>
        )}
      </Stack>
    </Stack>
  );
}
