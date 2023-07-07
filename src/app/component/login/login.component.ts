import { AuthloginService } from './../../service/authlogin.service';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private http:HttpClient,
    private authloginService:AuthloginService,
    private router:Router
    ){}




  ngOnInit(): void {

  }



  login(value:any){
    this.http.post(`${environment.BASE_Url}/log/login/`, value).subscribe({
      next:(res:any)=>{
        if(res.success==0){
          alert(res.msg)
        }
        else{
          const tokenValue= Object(jwtDecode(res.token));
          alert(res.msg);
          this.authloginService.setToken(res.token);
          if(tokenValue.profile.Role.role_id==1) this.router.navigate(['sales']);
          else if(tokenValue.profile.Role.role_id==2) this.router.navigate(['admin']);
          else if(tokenValue.profile.Role.role_id==3) this.router.navigate(['customer']);
          else if(tokenValue.profile.Role.role_id==4)this.router.navigate(['opration']);
          else this.router.navigate(['payment']);
        }

      },
      error:(err:any)=>{
       this.router.navigate(['error'])
      }
    })
  }
}
