import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';
import { TabsContainerComponent } from './tabs-container.component';
import {
  TabsLinkDirective,
  TabsNavItemDirective,
  TabsNavigationComponent
} from './tabs-navigation.component';
import { TabHeadingComponent } from './tab-heading.component';
import { TabsetComponent } from './tabs.component';

const DECLARATIONS = [
  TabsLinkDirective,
  TabsNavItemDirective,
  TabsNavigationComponent,
  TabsetComponent,
  TabHeadingComponent,
  TabComponent,
  TabsContainerComponent
];

@NgModule({
  imports: [CommonModule],
  exports: DECLARATIONS,
  declarations: DECLARATIONS
})
export class PdkTabsModule {}
