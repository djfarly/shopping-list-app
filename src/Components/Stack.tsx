import styled, { CSSProperties } from 'styled-components';

interface StackProps {
  children: React.ReactNode;
  space?: CSSProperties['gap'];
}

interface ContainerProps {
  readonly space?: CSSProperties['gap'];
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ space }) => space ?? '1.5rem'};
`;

export function Stack({ children, space }: StackProps) {
  return <Container space={space}>{children}</Container>;
}
