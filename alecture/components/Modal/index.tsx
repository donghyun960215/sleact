import React, { FC } from 'react';
import { CreateModal } from './styles';

const Modal: FC = ({ children }) => {
  return (
    <CreateModal>
      <div>Menu</div>
      {children}
    </CreateModal>
  );
};

export default Modal;
