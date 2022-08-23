import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '../../Button';
import TextEditor from '../../TextEditor';
import TitleEditor from '../../TitleEditor';

import { createNote, deleteNote, updateNotes } from '../../../store/Reducers/Notes/NoteSlice';
import { useAppDispatch } from '../../../store/store';
import { Note } from '../../../types/Note';

import useDebounce from '../../../utils/hooks/useDebounce';

import styles from './ModalContent.module.scss';

interface IModalContent {
  type?: 'create' | 'update';
  exitHandler: () => void;
  noteData?: Note;
  condition?: 'noStatus' | 'inProgress' | 'todo' | 'completed';
}

const ModalContent: React.FC<IModalContent> = ({ type, exitHandler, noteData, condition }) => {
  const dispatch = useAppDispatch();

  const [noteText, setNoteText] = useState<string>(noteData?.content ? noteData.content : '');
  const [titleText, setTitleText] = useState<string>(noteData?.title ? noteData.title : '');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [contentError, setContentError] = useState<boolean>(false);
  const [isButtonDisable, setButtonDisable] = useState<boolean>(false);

  const conditionRef = useRef<HTMLSelectElement>(null);

  const noteContentChangeHandler = useCallback((value: string) => {
    setNoteText(value);
  }, []);

  const titleContentChangeHandler = useCallback((value: string) => {
    setTitleText(value);
  }, []);

  const createButtonHandler = () => {
    if (!titleText) {
      setTitleError(true);
      return;
    }
    setTitleError(false);

    if (!noteText) {
      setContentError(true);
      return;
    }
    setContentError(false);

    const condition = conditionRef.current?.value || 'noStatus';
    const content = noteText;
    const title = titleText;

    const note = {
      content,
      title,
      condition
    };
    dispatch(createNote(note));
    exitHandler();
  };

  const deleteButtonHandler = useCallback(() => {
    dispatch(deleteNote(noteData?.id));
    exitHandler();
  }, [noteData]);

  const saveButtonHandler = () => {
    setTitleError(!titleText);
    setContentError(!noteText);

    const condition = conditionRef.current?.value || 'noStatus';
    const content = noteText;
    const title = titleText;

    const notes = {
      condition,
      content,
      title,
      id: noteData?.id
    };
    setButtonDisable(true);

    dispatch(updateNotes(notes));
    setTimeout(() => {
      setButtonDisable(false);
    }, 2000);
  };

  return (
    <>
      <div className={styles.darkBackground} onClick={exitHandler} />
      <div className={styles.modalContainer}>
        <div className={styles.detailContainer}>
          <div className={styles.title}>
            <TitleEditor textOnChange={titleContentChangeHandler} titleText={noteData?.title} />
            {type === 'create' ? (
              <Button className={styles.button} onClick={createButtonHandler}>
                Add Note
              </Button>
            ) : (
              <Button
                isDisable={isButtonDisable}
                className={styles.button}
                onClick={saveButtonHandler}
              >
                Save Note
              </Button>
            )}
          </div>
          {titleError && <div className={styles.error}>{'Title cannot be empty'}</div>}
          <div className={styles.conditionContainer}>
            <select
              ref={conditionRef}
              className={styles.selectContainer}
              defaultValue={noteData ? noteData.condition : condition ? condition : 'noStatus'}
            >
              <option value={'todo'}>To do</option>
              <option value={'inProgress'}>In Progress</option>
              <option value={'completed'}>Completed</option>
              <option value={'noStatus'}>No Status</option>
            </select>
            {type === 'update' && (
              <Button className={styles.deleteButton} onClick={deleteButtonHandler}>
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className={styles.textEditorContainer}>
          {contentError && <div className={styles.error}>{'Note cannot be empty'}</div>}

          <TextEditor textOnChange={noteContentChangeHandler} nText={noteData?.content} />
        </div>
      </div>
    </>
  );
};

export default ModalContent;
