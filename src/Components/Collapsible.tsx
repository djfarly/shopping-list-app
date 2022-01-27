import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Stack } from './Stack';

interface CollapsibleProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

const Collapse = styled.div``;

const Trigger = styled.button`
  -webkit-apperance: none;
  border: none;
  background-color: transparent;
  font-size: 1.15rem;
  font-weight: 600;
  display: flex;
  gap: 1rem;
  align-items: baseline;
`;

const Caret = styled.span`
  transform: scale(0.9);
  filter: grayscale() contrast(1.2);
`;

export function Collapsible({ children, title }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleTriggerClick = useCallback(
    () => setIsOpen(isOpen => !isOpen),
    []
  );
  return (
    <Stack>
      <Trigger onClick={handleTriggerClick}>
        <Caret>{isOpen ? '⬇️' : '➡️'}</Caret> <span>{title}</span>
      </Trigger>
      {isOpen ? <Collapse>{children}</Collapse> : null}
    </Stack>
  );
}
