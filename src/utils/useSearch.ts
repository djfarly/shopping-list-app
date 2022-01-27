import { search } from 'fast-fuzzy';
import * as React from 'react';
import { useApiItems } from './useApiItems';
import { useItems as useItemsContext } from '../utils/useItems';
import { useLocale } from '../utils/useLocale';

export function useSearch() {
  const { activeItems } = useItemsContext();
  const { locale } = useLocale();
  const [term, setTerm] = React.useState<string>('');
  const handleTermChange = React.useCallback(newTerm => {
    setTerm(newTerm);
  }, []);
  const termInputProps = React.useMemo(
    () => ({
      value: term,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        handleTermChange(event.target.value),
    }),
    [term, handleTermChange]
  );
  const resetTerm = React.useCallback(() => {
    setTerm('');
  }, []);

  const items = useApiItems();

  const results = React.useMemo(() => {
    if (!term || !items) return;
    const itemsToSearch = items.filter(
      ({ _id }) => !activeItems.find(activeItem => activeItem._id === _id)
    );
    const results = search(term, itemsToSearch, {
      keySelector: ({ name }) => name[locale],
    }).slice(0, 10);
    return results.length ? results : undefined;
  }, [term, items, activeItems, locale]);

  return { term, termInputProps, resetTerm, results };
}
