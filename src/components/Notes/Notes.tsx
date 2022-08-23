import React, { useEffect, useState } from 'react';

import Button from '../Button';
import NoteCard from '../NoteCard';
import Modal from '../Modal';

import { fetchNotes } from '../../store/Reducers/Notes/NoteSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { Note } from '../../types/Note';

import styles from './Notes.module.scss';

const Notes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { entities, ids, pending } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const Notes: { [k: string]: Note[] } = {
    completedNotes: [],
    inProgressNotes: [],
    noStatusNotes: [],
    todoNotes: []
  };

  ids.forEach((id) => {
    switch (entities[id]!.condition) {
      case 'todo':
        Notes.todoNotes.push(entities[id]!);
        break;
      case 'inProgress':
        Notes.inProgressNotes.push(entities[id]!);

        break;
      case 'noStatus':
        Notes.noStatusNotes.push(entities[id]!);

        break;
      case 'completed':
        Notes.completedNotes.push(entities[id]!);

        break;

      default:
        break;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.topContainer}>
          <span className={styles.title}>
            Hi, How are you today?
            {pending && <div className={styles.loading}>Loading...</div>}
          </span>
          <Button
            className={styles.button}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            + New Note
          </Button>
        </div>

        <div className={styles.cardContainer}>
          <NoteCard
            key={'todo'}
            badge="To do"
            notes={Notes.todoNotes}
            condition={'todo'}
            backgroundColorStyle={styles.todo}
          />
          <NoteCard
            key={'inProgress'}
            badge="In Progress"
            notes={Notes.inProgressNotes}
            condition={'inProgress'}
            backgroundColorStyle={styles.inProgress}
          />
          <NoteCard
            key={'completed'}
            badge="Completed"
            notes={Notes.completedNotes}
            condition={'completed'}
            backgroundColorStyle={styles.completed}
          />
          <NoteCard
            key={'noStatus'}
            badge="No Status"
            notes={Notes.noStatusNotes}
            condition={'noStatus'}
            backgroundColorStyle={styles.noStatus}
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          exitHandler={() => {
            setIsModalOpen(false);
          }}
          type="create"
        />
      )}
    </div>
  );
};

export default Notes;
