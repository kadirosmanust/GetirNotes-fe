import { Extension } from '@tiptap/core';

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => true
    };
  }
});

export default DisableEnter;
