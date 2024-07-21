import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageSalesComponent } from './components/manage-sales/manage-sales.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'products', component: ManageProductsComponent },
      { path: 'sales', component: ManageSalesComponent },
      { path: 'users', component: ManageUsersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
