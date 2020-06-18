import {
  SetFormPristine,
  UpdateFormStatus,
  UpdateFormValue,
} from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';

export const resetForm = (store: Store, path: string): void => {
  store.dispatch(new UpdateFormValue({ value: undefined, path }));
  store.dispatch(new SetFormPristine(path));
  store.dispatch(new UpdateFormStatus({ status: '', path }));
};
