import { ChangeDetectorRef, Component, Directive, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'pdk-tabs-navigation',
  template: `
    <pdk-tabs-container [vertical]="vertical">
      <div role="list" class="govuk-tabs__list"><ng-content></ng-content></div>
    </pdk-tabs-container>
  `
})
export class TabsNavigationComponent {
  @Input() vertical = false;
}

@Directive({
  selector: 'pdk-tabs-nav-item'
})
export class TabsNavItemDirective {
  @HostBinding('attr.role') role = 'listitem';
  @HostBinding('class.govuk-tabs__list-item') navItem = true;
  @HostBinding('class.govuk-tabs__list-item--selected') @Input() selected = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // @deprecated – this is to allow a child pdk-tabs-link directive to trigger
  // change detection after setting the `selected` input from below (legacy)
  markForCheck() {
    this.cdr.markForCheck();
  }
}

@Directive({
  selector: 'a[pdk-tabs-link]'
})
export class TabsLinkDirective {
  @HostBinding('class.govuk-tabs__tab') link = true;
  @Input()
  set selected(selected: boolean) {
    console.warn(
      'The `selected` input of a pdk-tabs-link has been deprecated, and will cease to work in a future release. Please add this the containing pdk-tabs-nav-item instead.'
    );
    if (this.tabsNavItem) {
      this.tabsNavItem.selected = selected;
      this.tabsNavItem.markForCheck();
    }
  }

  constructor(private tabsNavItem: TabsNavItemDirective) {}
}
