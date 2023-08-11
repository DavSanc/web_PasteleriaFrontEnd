import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from 'src/app/auth/interfaces/category.interface';
import { ProductsService } from 'src/app/services/products.service';

import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  // Atributos
  productForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  categories!: Array<any>;

  
  

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  buildForm() {
    this.productForm = new FormGroup({
      name:     new FormControl( '' ),
      price:    new FormControl( '' ),
      description: new FormControl( '' ),
      category: new FormControl( '' ),
      quantity: new FormControl( '' ),
      urlImage: new FormControl( null )
    });
  }

  createProduct() {
    const formData = new FormData();

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);

    const fileInput = this.fileInput.nativeElement;

    if(fileInput.files && fileInput.files.length > 0){
      formData.append('urlImage', fileInput.files[0], fileInput.files[0].name);
    }

    this.productService.createProduct(formData).subscribe((response)=>{
      console.log(response);
    });

    this.productForm.reset();

    setTimeout( () => {
      this.router.navigate( [ 'dashboard', 'products' ] );
    }, 1000 );
  }

  loadCategories() {
    this.categoriesService.getCategories()
      .subscribe( categories => {
        this.categories = categories;
      });
  }

}
