import React from 'react';
import ReactDom from 'react-dom';

import ModalContent from './ModalContent';

import { Note } from '../../types/Note';

interface IModal {
  type?: 'create' | 'update';
  exitHandler: () => void;
  noteData?: Note;
  condition?: 'noStatus' | 'inProgress' | 'todo' | 'completed';
}

const Modal: React.FC<IModal> = (props) => {
  return ReactDom.createPortal(<ModalContent {...props} />, document.getElementById('portal')!);
};

export default Modal;
