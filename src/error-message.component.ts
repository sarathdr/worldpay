import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

export interface ErrorMessageConfig {
  rule: string;
  message: string | ((error: any) => string);
}

const DEFAULT_ERROR_MESSAGES: ErrorMessageConfig[] = [
  {
    rule: 'required',
    message: `Provide this information`
  },
  {
    rule: 'pattern',
    message: 'Provide this information'
  },
  {
    rule: 'email',
    message: `Email not valid – enter correct address`
  },
  {
    rule: 'minCount',
    message: `Provide a minimum of {{expected}}`
  },
  {
    rule: 'maxCount',
    message: `Provide a maximum of {{expected}}`
  },
  {
    rule: 'maximumLength',
    message: `Provide a value that is no more than {{expected}} characters long`
  }
];

@Component({
  selector: '[pdk-error-message], pdk-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ errorMessage }}
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error-message.scss']
})
export class ErrorMessageComponent {
  @HostBinding('class.govuk-error-message') error = true;

  @Input() errors: { [type: string]: any } | null;
  @Input() errorMessages: ErrorMessageConfig[] = [];

  get errorMessage(): string | null {
    if (this.errors) {
      for (const config of this.errorMessages || []) {
        const error = this.errors[config.rule];

        if (error) {
          return typeof config.message === 'function' ? config.message(error) : config.message;
        }
      }
      for (const config of DEFAULT_ERROR_MESSAGES) {
        const error = this.errors[config.rule];

        if (error) {
          return typeof config.message === 'function' ? config.message(error) : config.message;
        }
      }
      return 'Invalid input';
    }
    return null;
  }
}
