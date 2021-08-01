import { NgControl } from '@angular/forms';

// Deprecated - use FormFieldControlV2 with explicit `markForCheck` to handle
// updates on implementations with `OnPush` change detection. This legacy
// definition will remain until a major release as apps depend up on it.

export abstract class FormFieldControl {
  id: string;
  ariaDescribedBy: string | null;
  hasError?: boolean;
  errorMessages?: { rule: string; message: string }[];

  readonly controlType: string;
  readonly multi: boolean;
  readonly ngControl: NgControl;
}

export abstract class FormFieldControlV2 extends FormFieldControl {
  markForCheck: () => void;
}

export interface ValidationError {
  id: string;
  message: string;
  shouldFocus?: boolean;
}
