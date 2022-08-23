import React from 'react';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';

import DisableEnter from './extentions/HandleEnter';

import styles from './TitleEditor.module.scss';

interface ITitleEditor {
  titleText?: string;
  textOnChange: (value: string) => void;
}

const TitleEditor: React.FC<ITitleEditor> = ({ titleText, textOnChange }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      DisableEnter,
      Placeholder.configure({
        placeholder: 'Title...'
      })
    ],
    content: titleText,
    onUpdate: ({ editor, transaction }) => {
      const val = editor.getText();
      textOnChange(val);
    }
  });
  return (
    <div className={styles.container}>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TitleEditor;
