import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../core/models/cart.interface';

@Component({
  selector: 'home',
  template: `
    <div class="cart">

      <table mat-table [dataSource]="cart.products" class="mat-elevation-z8">

        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Products</th>
          <td mat-cell *matCellDef="let element"> {{ element.name }} </td>
          <td mat-footer-cell *matFooterCellDef> Total</td>
        </ng-container>

        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef> Price</th>
          <td mat-cell *matCellDef="let element"> {{ element.price | currency: cart.currency }} </td>
          <td mat-footer-cell *matFooterCellDef> <b>{{ cart.total | currency: cart.currency }}</b></td>

        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['name', 'price']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['name', 'price'];"></tr>
        <tr mat-footer-row *matFooterRowDef="['name', 'price']; sticky: true"></tr>
      </table>
      <button mat-raised-button color="primary" routerLink="/payment">Continue to payment</button>
    </div>
  `,
  styles: [
      `
    .cart {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        width: 400px;
    }
    .cart table {
        width: 400px;
        margin-bottom: 30px;
    }
    `
  ]
})
export class HomeComponent {
  @Input() cart: Cart;
}
