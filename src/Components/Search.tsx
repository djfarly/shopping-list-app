import styled from 'styled-components';
import { useSearch } from '../utils/useSearch';
import { useItems } from '../utils/useItems';
import { useTranslate } from '../utils/useLocale';
import { Collapsible } from './Collapsible';
import { Item } from './Item';
import { ItemList } from './ItemList';
import { Stack } from './Stack';

const SearchInput = styled.input`
  -webkit-appearance: none;
  border: 1px solid lightgrey;
  font: inherit;
  padding: 0.6em 1.7em 0.55em 1.7em;
  border-radius: 0.5em;
  width: 100%;
`;

export function Search() {
  const { recentItems, handleSelectSearchItem } = useItems();
  const { term, termInputProps, resetTerm, results } = useSearch();

  const t = useTranslate();

  return (
    <Stack>
      <h2 id="search-title">{t('Search.title')}</h2>
      <SearchInput
        {...termInputProps}
        type="search"
        autoFocus
        placeholder={t('Search.placeholder')}
        aria-labelledby="search-title"
      />
      {term && !results ? (
        <div>
          <p>{t('Search.noResults')}</p>
        </div>
      ) : null}
      {results ? (
        <ItemList>
          {results.map(result => (
            <Item
              key={result._id}
              type="option"
              onSelect={item => {
                handleSelectSearchItem(item);
                resetTerm();
              }}
              item={result}
            />
          ))}
        </ItemList>
      ) : null}
      {!term && recentItems?.length ? (
        <Collapsible title={t('Search.recentItems')}>
          <ItemList>
            {recentItems.map(result => (
              <Item
                key={result._id}
                type="option"
                onSelect={handleSelectSearchItem}
                item={result}
              />
            ))}
          </ItemList>
        </Collapsible>
      ) : null}
    </Stack>
  );
}
