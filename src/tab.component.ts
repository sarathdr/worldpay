import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { TabHeadingComponent } from './tab-heading.component';

@Component({
  selector: 'pdk-tab',
  template: `
    <section
      [attr.id]="index"
      [attr.aria-hidden]="!selected"
      [class.govuk-tabs__panel--hidden]="!selected"
      class="govuk-tabs__panel"
      role="tabpanel"
    >
      <ng-template #innerTemplate> <ng-content select="pdk-tab-heading"></ng-content> </ng-template>
      <ng-content></ng-content>
    </section>
  `
})
export class TabComponent {
  @Input() heading: string;
  @Input() selected = false;
  @ContentChildren(TabHeadingComponent) tabHeading: QueryList<TabHeadingComponent>;
  @ViewChild('innerTemplate') headingTemplate: TemplateRef<any>;
  @Input() id: string;
  index: number;
}
