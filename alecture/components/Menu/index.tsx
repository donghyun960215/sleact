import React, { CSSProperties, FC } from 'react';
import { CreateMenu } from './styles';
import { CloseModalButton } from '@components/Modal/styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

export default Menu;
