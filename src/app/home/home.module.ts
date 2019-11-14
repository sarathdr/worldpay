import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeContainer } from './home.container';
import { MatButtonModule, MatListModule, MatTableModule } from '@angular/material';


@NgModule({
  declarations: [HomeContainer, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeContainer
      }
    ]),
    MatListModule,
    MatButtonModule,
    MatTableModule
  ]
})
export class HomeModule {
}
