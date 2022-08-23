export type Note = {
  content?: string;
  title?: string;
  condition?: 'todo' | 'inProgress' | 'completed' | 'noStatus';
  id: string;
};
