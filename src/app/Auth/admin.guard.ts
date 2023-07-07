import { CanActivateFn } from '@angular/router';
import jwtDecode from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if(token==null)return false;
  const tokenValue= Object(jwtDecode(token));
  const Role =  tokenValue.profile.Role.roleName;

    if(Role=='ADMIN') return true;
    return false;
};
