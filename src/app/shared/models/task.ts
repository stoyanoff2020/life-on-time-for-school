import { SeparatedDate } from './date';

export interface Task {
  id: string,
  goal_id: string,
  title: string,
  until_date: SeparatedDate,
  status: string,
  taskLeftDays: number
}
