import type { Item } from './types';
import { useApi } from './useApi';

export function useApiItems() {
  return useApi<Item[]>('items').data?.data;
}
