import type {
  Category as CategoryInterface,
  Item as ItemInterface,
} from './types';
import { useApiCategories } from './useApiCategories';
import groupBy from 'lodash.groupby';
import { createContext, useContext, useMemo } from 'react';
import { useImmerLocalStorage } from './useImmerLocalStorage';

const ItemsContext = createContext<{
  groupedActiveItems: Record<string, ItemInterface[]>;
  activeItems: ItemInterface[];
  recentItems: ItemInterface[];
  categories: CategoryInterface[];
  filteredCategories: CategoryInterface[];
  handleSelectActiveItem: (item: ItemInterface) => void;
  handleSelectSearchItem: (item: ItemInterface) => void;
}>({
  groupedActiveItems: {},
  activeItems: [],
  recentItems: [],
  categories: [],
  filteredCategories: [],
  handleSelectActiveItem: () => {},
  handleSelectSearchItem: () => {},
});

export function useItems() {
  return useContext(ItemsContext);
}

export function ItemProvider({ children }: { children: React.ReactNode }) {
  const [activeItems, updateActiveItems] = useImmerLocalStorage<
    ItemInterface[]
  >('shopping.activeItems', []);
  const [recentItems, updateRecentItems] = useImmerLocalStorage<
    ItemInterface[]
  >('shopping.recentItems', []);

  function handleSelectSearchItem(item: ItemInterface) {
    updateRecentItems(draft => {
      const index = draft.findIndex(({ _id }) => _id === item._id);
      draft.splice(index, 1);
    });
    updateActiveItems(draft => {
      draft.push(item);
    });
  }

  function handleSelectActiveItem(item: ItemInterface) {
    updateActiveItems(draft => {
      const index = draft.findIndex(({ _id }) => _id === item._id);
      draft.splice(index, 1);
    });
    updateRecentItems(draft => {
      draft.unshift(item);
    });
  }

  const groupedActiveItems: Record<string, ItemInterface[]> = useMemo(() => {
    if (!activeItems) return {};
    return groupBy(activeItems, ({ category }) => category._ref);
  }, [activeItems]);

  const categories = useApiCategories() ?? [];
  const filteredCategories = categories.filter(
    category => groupedActiveItems[category._id]?.length
  );

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
      activeItems,
      recentItems,
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
