import { NgForm } from '@angular/forms';

export interface ActionInfo {
  actionType: string,
  itemType: string,
  itemId?: string,
  formValue?: Object,
  goalId?: string,
  status?: string,
}
