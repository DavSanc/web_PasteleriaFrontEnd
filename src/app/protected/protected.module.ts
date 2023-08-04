import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { NewProductComponent } from './pages/products/new-product/new-product.component';
import { UpdateProductComponent } from './pages/products/update-product/update-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    ProductsComponent,
    NewProductComponent,
    UpdateProductComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
