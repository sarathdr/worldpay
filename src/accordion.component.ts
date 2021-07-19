import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, generateId } from '../util/index';

@Component({
  selector: 'pdk-accordion-item',
  template: `
    <div class="govuk-accordion__section" [class.govuk-accordion__section--expanded]="open">
      <div class="govuk-accordion__section-header">
        <h2 class="govuk-accordion__section-heading">
          <button
            type="button"
            [attr.id]="id + '-heading'"
            class="govuk-accordion__section-button"
            [attr.aria-controls]="id + '-content'"
            [attr.aria-describedby]="summary ? id + '-summary' : null"
            [attr.aria-expanded]="open"
            (click)="toggle()"
          >
            {{ title }}<span class="govuk-accordion__icon" aria-hidden="true"></span>
          </button>
        </h2>
        <div
          *ngIf="summary"
          [attr.id]="id + '-summary'"
          class="govuk-accordion__section-summary"
          pdk-typography="body"
        >
          {{ summary }}
        </div>
      </div>
      <div
        [attr.aria-labelledby]="id + '-heading'"
        [attr.id]="id + '-content'"
        class="govuk-accordion__section-content"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionItemComponent {
  @Input() title: string;
  @Input() summary?: string;

  id = generateId('govuk-accordion');
  open = false;

  constructor(
    @Inject(forwardRef(() => AccordionComponent)) private accordion: AccordionComponent,
    private cdr: ChangeDetectorRef
  ) {}

  markForCheck() {
    this.cdr.markForCheck();
  }

  toggle() {
    this.open = !this.open;
    this.accordion.onOpenChange();
  }
}

@Component({
  selector: 'pdk-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="govuk-accordion">
      <div *ngIf="controls" class="govuk-accordion__controls">
        <button
          type="button"
          class="govuk-accordion__open-all"
          [attr.aria-expanded]="allItemsExpanded"
          (click)="toggleOpenedStatusForAllItems()"
        >
          {{ allItemsExpanded ? 'Close' : 'Open' }} all<span pdk-visually-hidden> sections</span>
        </button>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./accordion.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements AfterContentInit, OnChanges {
  @ContentChildren(AccordionItemComponent) items: QueryList<AccordionItemComponent>;

  @Input()
  set controls(on: boolean) {
    this._controls = coerceBooleanProperty(on);
  }
  get controls() {
    return this._controls;
  }
  @Input() open: number[] = [];
  @Output() openChange = new EventEmitter<number[]>();

  private _controls = true;

  get allItemsExpanded(): boolean {
    return this.items.toArray().every(item => item.open);
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.markItemsForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['open'].isFirstChange()) {
      this.markItemsForCheck();
      this.onOpenChange();
    }
  }

  onOpenChange() {
    this.openChange.emit(
      this.items.reduce((items, item, index) => items.concat(item.open ? [index] : []), [])
    );
    this.cdr.markForCheck();
  }

  markItemsForCheck() {
    this.items.forEach((item, idx) => {
      item.open = (this.open || []).includes(idx);
      item.markForCheck();
    });
  }

  toggleOpenedStatusForAllItems() {
    const allItemsExpanded = this.allItemsExpanded;

    this.items.forEach(item => {
      item.open = !allItemsExpanded;
      item.markForCheck();
    });
  }
}
