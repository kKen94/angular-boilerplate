export interface FormState<T> {
  model: T;
  dirty: boolean;
  status: string;
  errors: unknown;
}

export class FormState<T> {
  constructor() {
    this.dirty = false;
    this.status = '';
  }
}
