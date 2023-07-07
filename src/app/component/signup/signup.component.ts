import { environment } from './../../../environments/environment';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  decodeReturnData:any={};
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.getAllClient();
  }



  profileCreate(value:any){
      this.http.post(`${environment.BASE_Url}/profile/`, value).subscribe({
        next: (res:any)=>{
          console.log(res)
          alert(res.msg);
        },
        error:(err)=>{
          this.router.navigate(['error'])
        }
      })
  }

  // get all client
  getAllClient(){
    this.http.get(`${environment.BASE_Url}/profile/`).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err)=>{
        this.router.navigate(['error'])
      }
    })
  }

}
