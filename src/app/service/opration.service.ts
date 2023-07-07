import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
import {  HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OprationService {

  constructor(private http:HttpClient) { }


  // get all accepted order
  getAllAcceptedOrder(){
     return this.http.get(`${environment.BASE_Url}/order/accept-order`);
  }

  getAllManageDatasByOrderId(order_id:number){
   return this.http.get(`${environment.BASE_Url}/manage-order/products-order/${order_id}`)
  }


  addInDatabase(value:string, manageOrder_id:number){
    const body={
      product_IMEIs:value
    }
    return this.http.put(`${environment.BASE_Url}/manage-order/update-imei/${manageOrder_id}`,body);

  };



  // change dispatch type
  changeDispatchType(dispatchType:string, order_id:number){
    const body={
      order_type:dispatchType,
      profile_id:localStorage.getItem('profile_id'),
    }
    return this.http.put(`${environment.BASE_Url}/order/dispatch-order/${order_id}`,body);
  }


}
