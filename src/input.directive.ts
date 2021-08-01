import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type InputWidth = 2 | 3 | 4 | 5 | 10 | 20 | 30;

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[pdk-input]',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./input.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent {}

@Directive({
  selector: '[pdk-input], [pdk-input-width]'
})
export class InputDirective {
  @Input('pdk-input')
  set width(width: number | undefined) {
    this._input = true;
    this._width = width || null;
  }

  @Input('pdk-input-width')
  set pdkInputWidth(width: number) {
    this._width = width;
  }

  @HostBinding('class.govuk-input')
  get input() {
    return this._input;
  }

  @HostBinding('class.govuk-input--error') @Input() hasError = false;

  @HostBinding('class.govuk-input--width-2')
  get two() {
    return this._width === 2;
  }

  @HostBinding('class.govuk-input--width-3')
  get three() {
    return this._width === 3;
  }

  @HostBinding('class.govuk-input--width-4')
  get four() {
    return this._width === 4;
  }

  @HostBinding('class.govuk-input--width-5')
  get five() {
    return this._width === 5;
  }

  @HostBinding('class.govuk-input--width-10')
  get ten() {
    return this._width === 10;
  }

  @HostBinding('class.govuk-input--width-20')
  get twenty() {
    return this._width === 20;
  }

  @HostBinding('class.govuk-input--width-30')
  get thirty() {
    return this._width === 30;
  }

  private _input = false;
  private _width: number | null = null;
}
