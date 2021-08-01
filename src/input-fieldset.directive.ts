import { Directive, Input, HostBinding, Component, ViewEncapsulation } from '@angular/core';
import { LabelType } from './input-label.directive';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'fieldset[pdk-fieldset]',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./input-fieldset.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FieldsetComponent {
  @HostBinding('class.govuk-fieldset') fieldset = true;
}

@Directive({
  selector: 'legend[pdk-legend]'
})
export class FieldsetLegendDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('pdk-legend') type: LabelType = 'default';

  @HostBinding('class.govuk-fieldset__legend') legend = true;

  @HostBinding('class.govuk-fieldset__legend--s')
  get small() {
    return this.type === 'small';
  }

  @HostBinding('class.govuk-fieldset__legend--m')
  get medium() {
    return this.type === 'medium';
  }

  @HostBinding('class.govuk-fieldset__legend--l')
  get large() {
    return this.type === 'large';
  }

  @HostBinding('class.govuk-fieldset__legend--xl')
  get xlarge() {
    return this.type === 'xlarge';
  }
}
