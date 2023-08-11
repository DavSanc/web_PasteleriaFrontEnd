import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product } from '../protected/interfaces/product.interface';
import { Products } from '../auth/interfaces/products.interface';
import { ProductResponse } from '../protected/interfaces/product-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  /** Atributos */
  BASE_URL: string = environment.baseUrl;
  token!: string;
  headers!: HttpHeaders;


  constructor(
    private http: HttpClient
  ) {
    const token = localStorage.getItem( 'token' );    // Obtiene el Token del LocalStorage
    this.token = token ? token : '';                  // Verifica si existe el token en el LocalStorage
    this.headers = new HttpHeaders().set( 'X-Token', `${ this.token }` );

    // console.log( this.token );
  }

  /** Realiza petición al endpoint del BackEnd que registra productos */
  createProduct( formData: FormData ) {
    this.headers.append('Accept', 'application/json');


    return this.http.post(
      `${ this.BASE_URL }/products`,      // URL del BackEnd al que debemos hacer la peticion
      formData,                            // Objeto de producto a crear
      { headers: this.headers }           // Cabeceras con información requerida
    );
  }

  getProducts() {
    return this.http.get<Products>(
      `${ this.BASE_URL }/products/`,   // URL del BackEnd al que debemos hacer la peticion
    );
  }

  getProductsByUser( userId: string ) {

    return this.http.get<Products>(
      `${ this.BASE_URL }/products/user/${ userId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    )
    .pipe(
      tap( response => {
        console.log( response );
      }),
      map( response => response[ 'products' ] )
    );
  }

  getProductById( productId: string ) {

    return this.http.get<ProductResponse>(
      `${ this.BASE_URL }/products/${ productId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    ).pipe(
      tap( ( console.log ) ),
      map( response => response.product )
    );
  }

  deleteProduct( userId: string | undefined ) {

    return this.http.delete<Product>(
      `${ this.BASE_URL }/products/${ userId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

  updateProduct( productId: string, product: Product ) {

    return this.http.patch(
      `${ this.BASE_URL }/products/${ productId }`,   // URL del BackEnd al que debemos hacer la peticion
      product,
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }
  getAllProducts(){

    return this.http.get<ProductResponse>(
      `${ this.BASE_URL }/products` 
    ).pipe(
      map(res =>{
        return res.products
      })
    )
  }

}
