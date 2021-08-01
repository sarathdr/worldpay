import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-tabs-container',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="js-enabled govuk-tabs" [class.pdk-tabs--vertical]="vertical">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./tabs.scss']
})
export class TabsContainerComponent {
  @Input() vertical = false;
}
