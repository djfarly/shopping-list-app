import type {
  Category as CategoryInterface,
  Item as ItemInterface,
} from './types';
import { useApiCategories } from './useApiCategories';
import groupBy from 'lodash.groupby';
import { createContext, useContext, useMemo } from 'react';
import { useImmerLocalStorage } from './useImmerLocalStorage';
import { useApiItems } from './useApiItems';

const ItemsContext = createContext<{
  groupedActiveItems?: Record<string, ItemInterface[]>;
  activeItems?: ItemInterface[];
  recentItems?: ItemInterface[];
  categories?: CategoryInterface[];
  filteredCategories?: CategoryInterface[];
  handleSelectActiveItem: (item: ItemInterface) => void;
  handleSelectSearchItem: (item: ItemInterface) => void;
}>({
  handleSelectActiveItem: () => {},
  handleSelectSearchItem: () => {},
});

export function useItems() {
  return useContext(ItemsContext);
}

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [activeItemIds, updateActiveItemIds] = useImmerLocalStorage<string[]>(
    'shopping.activeItems',
    []
  );
  const [recentItemIds, updateRecentItemIds] = useImmerLocalStorage<string[]>(
    'shopping.recentItems',
    []
  );

  function handleSelectSearchItem(item: ItemInterface) {
    updateRecentItemIds(draft => {
      const index = draft.findIndex(_id => _id === item._id);
      if (index >= 0) draft.splice(index, 1);
    });
    updateActiveItemIds(draft => {
      draft.push(item._id);
    });
  }

  function handleSelectActiveItem(item: ItemInterface) {
    updateActiveItemIds(draft => {
      const index = draft.findIndex(_id => _id === item._id);
      if (index >= 0) draft.splice(index, 1);
    });
    updateRecentItemIds(draft => {
      draft.unshift(item._id);
    });
  }

  const items = useApiItems();

  const activeItems = useMemo(() => {
    if (!items) return;
    return activeItemIds
      .map(_id => items.find(item => item._id === _id))
      .filter(Boolean) as ItemInterface[];
  }, [activeItemIds, items]);

  const recentItems = useMemo(() => {
    if (!items) return;
    return recentItemIds
      .map(_id => items.find(item => item._id === _id))
      .filter(Boolean) as ItemInterface[];
  }, [recentItemIds, items]);

  const groupedActiveItems: Record<string, ItemInterface[]> | undefined =
    useMemo(() => {
      if (!activeItems) return;
      return groupBy(activeItems, ({ category }) => category._ref);
    }, [activeItems]);

  const categories = useApiCategories();
  const filteredCategories = groupedActiveItems
    ? categories?.filter(category => groupedActiveItems[category._id]?.length)
    : undefined;

  const contextValue = useMemo(
    () => ({
      groupedActiveItems,
      activeItems,
      recentItems,
      categories,
      filteredCategories,
      handleSelectActiveItem,
      handleSelectSearchItem,
    }),
    [
      groupedActiveItems,
      activeItemIds,
      recentItemIds,
      categories,
      filteredCategories,
      handleSelectActiveItem,
      handleSelectSearchItem,
    ]
  );
  return (
    <ItemsContext.Provider value={contextValue}>
      {children}
    </ItemsContext.Provider>
  );
}
