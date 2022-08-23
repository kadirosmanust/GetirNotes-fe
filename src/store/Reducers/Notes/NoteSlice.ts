import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Note } from '../../../types/Note';
import { httpDelete, httpGet, httpPatch, httpPost } from '../../../utils/helpers/httpHelpers';
import { RootState } from '../../store';
import { CONFIG } from '../../../config/index';

type CreateNote = {
  condition: 'noStatus' | 'completed' | 'todo' | 'inProgress';
  content: string;
  title: string;
};

const notesAdapter = createEntityAdapter<Note>({
  selectId: (note) => note.id
});

export const fetchNotes: any = createAsyncThunk('notes/fetchNotes', async () => {
  const response = (await httpGet(CONFIG.ENDPOINTS.NOTES)) as AxiosResponse;

  return response.data;
});

export const createNote: any = createAsyncThunk(
  'notes/createNote',
  async (note: CreateNote, thunkAPI) => {
    const response = (await httpPost(`${CONFIG.ENDPOINTS.NOTES}`, note)) as AxiosResponse;

    const payload = { status: response.status, note: response.data };
    return payload;
  }
);

export const deleteNote: any = createAsyncThunk(
  'notes/deleteNote',
  async (noteId: string, thunkAPI) => {
    const response = (await httpDelete(`${CONFIG.ENDPOINTS.NOTES}/${noteId}`)) as AxiosResponse;
    const payload = { status: response.status, noteId: noteId };
    return payload;
  }
);

export const updateNotes: any = createAsyncThunk(
  'notes/updateNotes',
  async (note: Note, thunkAPI) => {
    const response = (await httpPatch(
      `${CONFIG.ENDPOINTS.NOTES}/${note.id}`,
      note
    )) as AxiosResponse;
    const payload = { status: response.status, note: response.data };
    return payload;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState: notesAdapter.getInitialState({
    pending: false,
    error: false,
    updating: false
  }),
  reducers: {
    createOne: notesAdapter.addOne,
    setAllNotes: notesAdapter.setAll
  },
  extraReducers: {
    [fetchNotes.pending](state) {
      state.pending = true;
    },
    [fetchNotes.fulfilled](state, { payload }) {
      state.pending = false;
      notesAdapter.setAll(state, payload);
    },
    [fetchNotes.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [createNote.pending](state) {
      state.pending = true;
    },
    [createNote.fulfilled](state, { payload }) {
      state.pending = false;
      notesAdapter.addOne(state, payload.note);
    },
    [createNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [deleteNote.pending](state) {
      state.pending = true;
    },
    [deleteNote.fulfilled](state, { payload }) {
      state.pending = false;
      notesAdapter.removeOne(state, payload.noteId);
    },
    [deleteNote.rejected](state) {
      state.pending = false;
      state.error = true;
    },
    [updateNotes.pending](state) {
      state.updating = true;
    },
    [updateNotes.fulfilled](state, { payload }) {
      state.pending = false;
      notesAdapter.updateOne(state, {
        id: payload.note.id,
        changes: payload.note
      });
    },
    [updateNotes.rejected](state) {
      state.updating = false;
      state.error = true;
    }
  }
});

export const getNotes = (state: RootState) => state.notes;

export default notesSlice.reducer;
