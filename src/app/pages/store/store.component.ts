import { Component, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { Product } from 'src/app/protected/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  products: Products = { products: [] }
  cartIcon = faCartPlus;
  cart!: any []

  constructor(
    private productsService: ProductsService 
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts()
     .subscribe((data) => {
      this.products = data
      console.log(this.products);
      
    });
  }

  addToCart(product: Product) {
    console.log( product );

    const cartStorage = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!) : [];
    this.cart = cartStorage 
    const foundProduct = this.cart.find(( item )=>{
      return item._id == product._id
    })
    if (foundProduct){
      foundProduct.quantity = foundProduct.quantity + 1 //foundProduct.quantity += 1
      foundProduct.total = foundProduct.price*foundProduct.quantity
      }else{
        this.cart.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          describe: product.description,
          urlImg: product.urlImage,
          total: product.price,
          stock: product.quantity

        })

    }
  localStorage.setItem('cart', JSON.stringify(this.cart)) 
  }

}
