import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageSalesComponent } from './components/manage-sales/manage-sales.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [
    ManageProductsComponent,
    ManageSalesComponent,
    ManageUsersComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
