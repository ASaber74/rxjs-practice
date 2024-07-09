import { Component } from '@angular/core';

import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Products';
  errorMessage = '';

  // Products
  products: Product[] = [];

  // Selected product id to highlight the entry
  selectedProductId: number = 0;

  products$ = this.productsService.products$.pipe(
    tap(() => console.log('BBB')),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(private productsService: ProductService) {}

  onSelected(productId: number): void {
    this.productsService.productSelected(productId)
  }
}
