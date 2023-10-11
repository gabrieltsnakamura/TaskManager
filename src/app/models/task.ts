export interface Task {
  id?: number;
  user_id: number;
  description: string;
  status: boolean;
  date: string;
}