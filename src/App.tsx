import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Layout from './components/Common/Layout';
import Notes from './components/Notes/Notes';
import NotesProvider from './components/Provider';

function App() {
  return (
    <NotesProvider>
      <Layout>
        <DndProvider backend={HTML5Backend}>
          <Notes />
        </DndProvider>
      </Layout>
    </NotesProvider>
  );
}

export default App;
