import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type LabelType = 'default' | 'small' | 'medium' | 'large' | 'xlarge';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[pdk-label]',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./input-label.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelComponent {}

@Directive({
  selector: 'label[pdk-label]'
})
export class LabelDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('pdk-label') type: LabelType = 'medium';

  @HostBinding('class.govuk-label') label = true;

  @HostBinding('class.govuk-label--s')
  get small() {
    return this.type === 'small';
  }

  @HostBinding('class.govuk-label--m')
  get medium() {
    return this.type === 'medium';
  }

  @HostBinding('class.govuk-label--l')
  get large() {
    return this.type === 'large';
  }

  @HostBinding('class.govuk-label--xl')
  get xlarge() {
    return this.type === 'xlarge';
  }
}
