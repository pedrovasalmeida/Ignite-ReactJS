import Logo from '../../assets/logo.svg';

import { Container, Content } from './styles';

interface HeaderProps {
  onNewTransactionModalOpen: () => void;
}

export function Header({ onNewTransactionModalOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="dt money" />
        <button type="button" onClick={onNewTransactionModalOpen}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
