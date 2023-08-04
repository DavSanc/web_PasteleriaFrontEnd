import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { validateTokenGuard } from '../auth/guards/validate-token.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'products/new',
        component: NewProductComponent
      },
      {
        path: 'products/update/:id',
        component: UpdateProductComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
    canActivate: [ validateTokenGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
