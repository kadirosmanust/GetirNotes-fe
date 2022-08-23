import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store/store';

interface INotesProvider {
  children: React.ReactNode;
}

const NotesProvider: React.FC<INotesProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default NotesProvider;
