import { Category } from './category';

export interface UserAppInfo {
  categories: Array<Category>,
  appType: string,
  maxGoals: number,
  maxTasks: number,
}
