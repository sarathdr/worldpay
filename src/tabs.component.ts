import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { TabComponent } from './tab.component';

export interface TabChangeEvent {
  index: number;
  source: TabComponent;
}

@Component({
  selector: 'pdk-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-tabs-container [vertical]="vertical">
      <ul class="govuk-tabs__list" role="tablist" (keydown)="changeTab($event)">
        <li
          *ngFor="let tab of tabs"
          class="govuk-tabs__list-item"
          [class.govuk-tabs__list-item--selected]="tab.selected"
          role="presentation"
        >
          <a
            class="govuk-tabs__tab"
            href="javascript:void(0);"
            (click)="selectedTabIndex = tab.index"
            role="tab"
            [attr.aria-controls]="tab.index"
            [attr.aria-selected]="tab.selected ? 'true' : 'false'"
            [attr.tabindex]="tab.selected ? '0' : '-1'"
          >
            <ng-container *ngIf="tab.heading"> {{ tab.heading }} </ng-container>
            <ng-container *ngTemplateOutlet="tab.headingTemplate"></ng-container>
          </a>
        </li>
      </ul>
      <ng-content></ng-content>
    </pdk-tabs-container>
  `
})
export class TabsetComponent implements AfterContentInit {
  @Input() vertical = false;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  private _selectedTabIndex = 0;
  private _selectedTabId: string;

  @Input()
  get selectedTabIndex() {
    return this._selectedTabIndex;
  }
  set selectedTabIndex(value: number) {
    this._selectedTabIndex = value;
    this.showTab();
  }

  @Input()
  get selectedTabId(): string {
    return this._selectedTabId;
  }
  set selectedTabId(value: string) {
    this._selectedTabId = value;
    if (this.tabs) {
      this.selectedTabIndex = this.getSelectedTabById().index;
    }
  }

  @Output()
  selectedTabChange = new EventEmitter<TabComponent>();

  constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {}

  changeTab(event: any) {
    switch (event.keyCode) {
      case 37:
      case 38:
        this.selectPreviousTab();
        break;
      case 39:
      case 40:
        this.selectNextTab();
        break;
      default:
    }
  }

  getSelectedTabById(): TabComponent {
    return this.tabs.find(tab => tab.id === this._selectedTabId) as TabComponent;
  }

  getSelectedTabByIndex(): TabComponent {
    return this.tabs.find(tab => tab.index === this._selectedTabIndex) as TabComponent;
  }

  selectNextTab() {
    const targetIndex =
      this._selectedTabIndex === this.tabs.length - 1 ? 0 : this._selectedTabIndex + 1;
    this.selectedTabIndex = targetIndex;
  }

  selectPreviousTab() {
    const targetIndex =
      this._selectedTabIndex === 0 ? this.tabs.length - 1 : this._selectedTabIndex - 1;
    this.selectedTabIndex = targetIndex;
  }

  selectTab(targetIndex: number) {
    this.selectedTabIndex = targetIndex;
  }

  showTab() {
    if (this.tabs) {
      this.tabs.forEach((t: TabComponent) => {
        t.selected = t.index === this._selectedTabIndex;
      });
      this.selectedTabChange.emit(this.getSelectedTabByIndex());
      this.changeDetector.markForCheck();
    }
  }

  ngAfterContentInit() {
    this.tabs.forEach((tab: TabComponent, index: number) => (tab.index = index));
    if (this._selectedTabId) {
      this.selectedTabIndex = this.getSelectedTabById().index;
    }
    this.showTab();
  }
}
