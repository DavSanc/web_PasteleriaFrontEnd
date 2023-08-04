import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Category } from '../auth/interfaces/category.interface';
import { Observable, map, tap } from 'rxjs';
import { CategoryResponse } from '../protected/interfaces/category-response.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
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

  getCategories() {

    return this.http.get<CategoryResponse>(
      `${ this.BASE_URL }/categories`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    )
    .pipe(
      tap( response => {
        console.log( response );
      }),
      map( response => response[ 'categories' ] )
    );
  }

  /** Realiza petición al endpoint del BackEnd que registra productos */
  createCategory( category: Category ) {

    return this.http.post(
      `${ this.BASE_URL }/categories`,      // URL del BackEnd al que debemos hacer la peticion
      category,                            // Objeto de producto a crear
      { headers: this.headers }           // Cabeceras con información requerida
    );
  }

  deleteCategory( categoryId: string | undefined ) {

    return this.http.delete<Category>(
      `${ this.BASE_URL }/categories/${ categoryId }`,   // URL del BackEnd al que debemos hacer la peticion
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

  // TODO: Verificar el tipado para categoria en este punto
  updateCategory( category: any ) {

    return this.http.patch(
      `${ this.BASE_URL }/categories/${ category._id }`,   // URL del BackEnd al que debemos hacer la peticion
      category,
      { headers: this.headers }                         // Cabeceras con información requerida
    );
  }

}
