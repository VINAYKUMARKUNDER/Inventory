import { SalesService } from './../../service/sales.service';
import { AuthloginService } from './../../service/authlogin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  Products: any = [];
  popup_view: string = '';
  Plans: any = [];
  plan_year: number = 0;
  isGST: boolean = false;
  quantity: number = 0;
  product_id: any = 0;
  cart: any = [];
  orderProducts: any = [];
  viewOrder: any = {};
  cartData: any = {};
  customersData: any = [];
  customer_id: number = 0;
  notificationData: any = [];
  transactionHistoryData: any = [];
  manageOrder:any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authloginService: AuthloginService,
    private productService:ProductService,
    private salesService:SalesService
  ) {}

  ngOnInit(): void {
    this.getAllOrder('all');
    this.getAllProducts();
    this.getAllCartData(this.authloginService.getProfile_id());
  }

  // get all Products
  getAllProducts() {
    this.http.get(`${environment.BASE_Url}/product/`).subscribe({
      next: (res: any) => {
        this.Products = res.data;
      },
      error: (err) => {
        this.router.navigate(['error'])
      },
    });
  }


  // get all plan by product id
  viewPlan(product_id: any) {
    this.product_id = product_id;
    this.http.get(`${environment.BASE_Url}/recharge/recharge-plan/${product_id}`)
    .subscribe({
      next: (res: any) => {
        console.log(res)
        this.Plans = res.productRechargePlan;
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }

  duration(time: any) {
    this.plan_year = time;
  }

  create_Order() {
    const data = {
      quantity: this.quantity,
      recharge_plan: this.plan_year,
      product_id: this.product_id,
      profile_id: this.authloginService.getProfile_id(),
      gstbill_status: this.isGST,
    };


    this.http.post(`${environment.BASE_Url}/manage-order/`, data).subscribe({
      next: (res: any) => {
        alert(res.msg);
        this.getAllCartData(this.authloginService.getProfile_id());
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }

  // get cart data
  getAllCartData(profile_id: any) {
    this.http
      .get(`${environment.BASE_Url}/manage-order/cart-data/${profile_id}`)
      .subscribe({
        next: (res: any) => {
          this.cart = res.data;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  setCustomer_id(customer_id: any) {
    this.customer_id = customer_id;
  }

  // book order
  bookOrder() {
    const body = {
      customer_id: this.customer_id,
    };

    this.http
      .post(
        `${environment.BASE_Url}/order/book-order/${this.authloginService.getProfile_id()}`,
        body
      )
      .subscribe({
        next: (res: any) => {
          alert(res.msg);
          if (res.success == 1)
            this.getAllCartData(this.authloginService.getProfile_id());
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  getAllOrder(status: string) {
    this.http
      .get(
        `${environment.BASE_Url}/order/by-profile/${this.authloginService.getProfile_id()}/${status}`
      )
      .subscribe({
        next: (res: any) => {
          this.orderProducts = res.data;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }








  productFindByCartId(product_id: any): void {
    this.http
      .get(`${environment.BASE_Url}/manage-order/${product_id}`)
      .subscribe({
        next: (res: any) => {
          this.cartData = res.data;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  getAllOrderDetailsBuOrderId(order_id: any): void {
    this.http
      .get(`${environment.BASE_Url}/manage-order/products-order/${order_id}`)
      .subscribe({
        next: (res: any) => {
          this.viewOrder = res.order;
          this.manageOrder = res.manageOrder;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  // get all customer by sales id
  getAllCustomerBySalesId(): void {

      this.http
        .get(
          `${environment.BASE_Url}/customer/by-sales/${this.authloginService.getProfile_id()}`
        )
        .subscribe({
          next: (res: any) => {
            this.customersData = res.data;
          },

          error: (err) => {
            this.router.navigate(['error']);
          },
        });
  }

  // add new customer
  addCustomer(data: any): void {
    data.profile_id = this.authloginService.getProfile_id();
    this.http.post(`${environment.BASE_Url}/customer/`, data).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }

  openRegistationPopup(): void {
    const popbox = document.getElementById('popbox');
    if (popbox) popbox.style.display = 'flex';
  }

  closeRegistationPopup(): void {
    const popbox = document.getElementById('popbox');
    if (popbox) popbox.style.display = 'none';
  }

  getAllNotificationBySales() {
    this.http
      .get(
        `${environment.BASE_Url}/notification/by-profile/${this.authloginService.getProfile_id()}`
      )
      .subscribe({
        next: (res: any) => {
          this.notificationData = res.data;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  payAmount(order_id: any) {
    localStorage.setItem('order_id', order_id);
    this.router.navigate(['payment']);
  };


  getAllTransactionByOrderId(order_id:any) {
    this.openNotificationPopup();
    this.http
      .get(`${environment.BASE_Url}/payment/history/${order_id}`)
      .subscribe({
        next: (res: any) => {
          this.transactionHistoryData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  };

  openNotificationPopup(){
    console.log('ok')
   let popup = document.getElementById('notificationPopup');
    if(popup)popup.style.display = "block";
  }

  closeNotificationPopup(){
    let popup = document.getElementById('notificationPopup');
    if(popup)popup.style.display = "none";
  };


  // export table to csv file
  exportTableToCSV(){
    this.salesService.exportTableToCSV();
  }

}
