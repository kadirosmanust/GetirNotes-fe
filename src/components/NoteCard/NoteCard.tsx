import React, { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';

import Button from '../Button';
import Modal from '../Modal';
import NoteItem from '../NoteItem';

import { Note } from '../../types/Note';

import styles from './NoteCard.module.scss';

interface INoteCard {
  children?: React.ReactNode;
  badge?: string;
  backgroundColorStyle?: string;
  borderColor?: string;
  notes?: Note[];
  condition?: 'noStatus' | 'inProgress' | 'todo' | 'completed';
}

const NoteCard: React.FC<INoteCard> = ({ badge, backgroundColorStyle, notes, condition }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const selectBackgroundColor = useCallback((isActive: boolean, canDrop: boolean) => {
    if (isActive) {
      return '#06d6a0';
    } else if (canDrop) {
      return '#cbf3f090';
    } else {
      return 'transparent';
    }
  }, []);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'box',
      drop: () => ({
        name: `${condition}`,
        condition: condition
      }),
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }),
    [condition]
  );

  const backgroundColor = selectBackgroundColor(canDrop && isOver, canDrop);

  return (
    <div ref={drop} style={{ backgroundColor }} className={styles.container}>
      <div className={styles.noteDetail}>
        <div className={`${styles.toDoBadge} ${backgroundColorStyle}`}>{badge}</div>
        <div className={styles.number}>{notes ? notes.length : 0}</div>
        <Button
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
          className={styles.button}
        >
          <svg viewBox="0 0 16 16">
            <path d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"></path>
          </svg>
        </Button>
      </div>
      <div>
        {notes?.map((item) => {
          return <NoteItem key={item.id} noteContent={item} />;
        })}
        <Button
          onClick={() => {
            setIsCreateModalOpen(true);
          }}
          className={styles.newButton}
        >
          <svg viewBox="0 0 16 16">
            <path d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"></path>
          </svg>
          New
        </Button>
        {isCreateModalOpen && (
          <Modal
            exitHandler={() => {
              setIsCreateModalOpen(false);
            }}
            type="create"
            condition={condition}
          />
        )}
      </div>
    </div>
  );
};

export default memo(NoteCard);
