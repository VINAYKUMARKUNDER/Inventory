import { Injectable, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthloginService implements OnInit{

  constructor() { }

  ngOnInit(): void {

  }


  public setToken(jwtToken:string):void{
    localStorage.setItem('token', jwtToken);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setRoles(role:string):void{
    localStorage.setItem('role', role);
  }

  public getRole(){
    const token = this.getToken();
    if(token==null)return;
    const tokenValue= Object(jwtDecode(token));
    return tokenValue.profile.Role.roleName;
  }

  public getProfile_id(){
    const token = this.getToken();
    if(token==null)return;
    const tokenValue= Object(jwtDecode(token));
    return tokenValue.profile_id;
  }

  public clear():void{
      localStorage.clear();
  }

  public loggedIn():boolean{

    if(this.getToken()==null  && this.getRole()==null )return  false;
    return true;
  }

}
