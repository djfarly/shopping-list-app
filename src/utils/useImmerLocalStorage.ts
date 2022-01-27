import produce, { Draft, nothing, freeze } from 'immer';
import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export type Reducer<S = any, A = any> = (
  draftState: Draft<S>,
  action: A
) => void | (S extends undefined ? typeof nothing : S);
export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
export function useImmerLocalStorage<S = any>(
  key: string,
  initialValue: S | (() => S)
): ImmerHook<S>;

export function useImmerLocalStorage(key: string, initialValue: any) {
  const [val, updateValue] = useLocalStorageState(key, () =>
    freeze(
      typeof initialValue === 'function' ? initialValue() : initialValue,
      true
    )
  );
  return [
    val,
    useCallback(updater => {
      if (typeof updater === 'function') updateValue(produce(updater) as any);
      else updateValue(freeze(updater));
    }, []),
  ];
}
