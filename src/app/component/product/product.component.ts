import { AuthloginService } from './../../service/authlogin.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent  implements OnInit{
  constructor(
    private http: HttpClient,
    private router:Router,
    private authloginService:AuthloginService
  ) {}


  Products:any=[]

  ngOnInit(): void {
    this.getAllProducts();
  }



  // get all Products
  getAllProducts() {
    this.http.get(`${environment.BASE_Url}/product/`).subscribe({
      next:(res:any)=>{
          this.Products=res.data;
      },error:(err)=>{
        this.router.navigate(['error'])
      }
    });
  }


  // view recharge plan
  viewPlan(product_id:number){
    this.http.get(`${environment.BASE_Url}/recharge/recharge-plan/${product_id}`).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        this.router.navigate(['error'])
      }
    })
  };


  //buy product
  buy():void{
    const token = this.authloginService.getToken();
    if(token){
      this.router.navigate(['sales'])
    }else{
      alert('login first')
      this.router.navigate(['login'])
    }
  }




}
