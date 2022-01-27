import styled from 'styled-components';

interface ItemListProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export function ItemList({ children }: ItemListProps) {
  return <Container>{children}</Container>;
}
