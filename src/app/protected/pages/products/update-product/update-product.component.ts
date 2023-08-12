import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/auth/interfaces/category.interface';
import { ProductsService } from 'src/app/services/products.service';

import { categories } from '../fake-categories';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/protected/interfaces/product.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  // Atributos
  productForm!: FormGroup;
  @ViewChild('fileInput') fileInput!: ElementRef;
  categories!: Array<any>;
  productId!: string;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.loadCategories();

    this.activatedRoute.params
      .pipe(
        switchMap( ( result ) => {
          const { id: productId } = result;
          this.productId = productId;

          return this.productService.getProductById( productId );
        } )
      )
      .subscribe( product => {
        console.log( product );

        /** Establece valores de producto en el atributo del componente */
        this.product = product;

        /** Establece los valores de cada uno de los campos del formulario */
        this.productForm.setValue({
          name: this.product?.name,
          price: this.product?.price,
          quantity: this.product?.quantity,
          category: this.product?.category,
          description: this.product?.description
        });
      });


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


  updateProduct() {
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

    this.productService.updateProduct(
      this.productForm.get('_id')?.value, formData
    ).subscribe((response)=>{
        console.log(response);
        
    })
    // this.productService.updateProduct(
    //   this.productId,
    //   this.productForm.value
    // )
    //   .subscribe( ( response ) => {
    //     console.log( response );
    //   });

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
