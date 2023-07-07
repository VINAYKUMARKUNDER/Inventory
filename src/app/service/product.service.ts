import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthloginService } from './authlogin.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private authloginService: AuthloginService,
    private router: Router
  ) {}




  //get all product
  getAllProduct():any{
    this.http.get(`${environment.BASE_Url}/product/`).subscribe({
      next: (res: any) => {
        return res;
      },
      error: (err) => {
        this.router.navigate(['error'])
      },
    });
  };



  // view all Plan by product id
  viewAllPlanByProductId(product_id:number):any{
    this.http
      .get(`${environment.BASE_Url}/recharge/recharge-plan/${product_id}`)
      .subscribe({
        next: (res: any) => {
          return res;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  };


  // create a cart order
  createCartOrder(){

  }



}
