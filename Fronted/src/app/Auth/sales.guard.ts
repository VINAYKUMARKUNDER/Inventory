import jwtDecode from 'jwt-decode';
import { AuthloginService } from './../service/authlogin.service';
import { CanActivateFn } from '@angular/router';



export const salesGuard: CanActivateFn = (route, state) => {

   const token = localStorage.getItem('token');
    if(token==null)return false;
    const tokenValue= Object(jwtDecode(token));
    const Role =  tokenValue.profile.Role.roleName;

      if(Role=='SALES') return true;
      return false;
};
