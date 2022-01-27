import { useCallback } from 'react';
import type { Item as ItemInterface } from '../utils/types';
import styled from 'styled-components';
import { useLocale } from '../utils/useLocale';

interface ItemProps {
  item: ItemInterface;
  onSelect: (item: ItemInterface) => void;
  type: 'active' | 'option';
}

interface ItemButtonProps {
  readonly itemType: 'active' | 'option';
}

const ItemButton = styled.button<ItemButtonProps>`
  -webkit-apperance: none;
  border: none;
  padding: 0.6em 1.7em 0.55em 1.7em;
  background-color: ${({ itemType }) =>
    itemType === 'active' ? 'lightgreen' : 'lightblue'};
  border-radius: 0.5em;
  font-size: 1rem;
`;

export function Item({ item, onSelect, type }: ItemProps) {
  const { locale } = useLocale();
  const handleClick = useCallback(() => onSelect(item), [onSelect, item]);
  return (
    <ItemButton onClick={handleClick} itemType={type}>
      {item.name[locale]}
    </ItemButton>
  );
}
