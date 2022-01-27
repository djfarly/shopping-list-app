import type { Category } from './types';
import { useApi } from './useApi';

export function useApiCategories() {
  return useApi<Category[]>('categories').data?.data;
}
