import React, { useCallback } from 'react';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd';

import Modal from '../Modal';

import { useAppDispatch } from '../../store/store';
import { deleteNote, updateNotes } from '../../store/Reducers/Notes/NoteSlice';

import { Note } from '../../types/Note';

import styles from './NoteItem.module.scss';

interface INoteItem {
  noteContent: Note;
}

export interface BoxProps {
  id: string;
}

interface DropResult {
  condition: string;
  dropEffect: string;
  name: string;
}
const ItemTypes = {
  BOX: 'box'
};

const NoteItem: React.FC<INoteItem> = ({ noteContent }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const deleteClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteNote(noteContent.id));
  }, []);

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id: noteContent.id },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        if (noteContent.condition === dropResult.condition) {
          return;
        }
        if (item && dropResult) {
          const updatedNote = { ...noteContent, condition: dropResult.condition };
          dispatch(updateNotes(updatedNote));
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [noteContent.id]
  );

  return (
    <>
      <div
        ref={drag}
        className={styles.container}
        onClick={() => {
          setIsUpdateModalOpen(true);
        }}
      >
        <div className={styles.innerContainer}>
          <p className={styles.title}>{noteContent.title}</p>
          <div onClick={deleteClickHandler} className={styles.delete}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                fill="inherit"
              />
              <path d="M9 9H11V17H9V9Z" fill="inherit" />
              <path d="M13 9H15V17H13V9Z" fill="inherit" />
            </svg>
          </div>
        </div>
      </div>
      {isUpdateModalOpen && (
        <Modal
          exitHandler={() => {
            setIsUpdateModalOpen(false);
          }}
          type="update"
          noteData={noteContent}
        />
      )}
    </>
  );
};

export default NoteItem;
