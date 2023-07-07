import { AuthloginService } from './../../service/authlogin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{




  dataByStatus:any=[]
  db_StatusData:any={data:[]};

  constructor(private http:HttpClient, private authloginService:AuthloginService){}

  ngOnInit(): void {
    this.getAllDataByStatus('_');
  }





  getAllDataByStatus(status:string){
      this.http.get(`${environment.BASE_Url}/order/status/${status}`).subscribe({
        next:(res)=>{
          this.db_StatusData=res;


          this.dataByStatus=this.db_StatusData.data;
        },
        error:(err)=>{
          console.log(err)
        }
      })
  };


  updateOrderStatus(order_status:string, order_id:number){
    let body ={
      order_status:order_status,
      why:'add after some time this text area in popup',
      profile_id:this.authloginService.getProfile_id
    }
    this.http.put(`${environment.BASE_Url}/order/update-status/${order_id}`, body).subscribe({
      next:(res)=>{
        console.log(res)
      }, error:(err)=>{
        console.log(err)
      }
    })
  };


  // get All Products Details by order id
  getOrderDetails(order_id:number){
      this.http.get(`${environment.BASE_Url}/manage-order/products-order/${order_id}`).subscribe({
        next:(res)=>{
          console.log(res)
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  openPopUp(): void {
    const popup = document.getElementById('myModal');
    if (popup != null) popup.style.display = 'block';
  }

  closePopUp(): void {
    // this.popup_view='';
    const popup = document.getElementById('myModal');
    if (popup != null) popup.style.display = 'none';
  }


}
