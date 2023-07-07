
import { SalesService } from './../../service/sales.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthloginService } from 'src/app/service/authlogin.service';
import { environment } from 'src/environments/environment';
import  jsPDF from 'jspdf';





@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  order_id: any = 0;
  profile_id : number=0;
  pending_payment: any = 0;
  viewHistory: boolean = false;
  orderProducts:any = [];
  customerName: string='mohan lala';
  amount: number=0;
  date: string='33223';
  viewOrderTable:boolean = false;
  viewPaymentSection:boolean = false;
  transactionHistoryData:any = [];
  aboutOrder:any={};
  transactionInfo:any = {};
  viewPayment:boolean=false;
  customersData:any = [];
  sales_id:number=0;
  salesData:any = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private authloginService: AuthloginService,
    private salesService: SalesService,
  ) {}

  ngOnInit(): void {
  }







  downloadReceipt(): void {
    console.log(this.aboutOrder)
      const receiptContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Receipt</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

            <style>
            body {
              padding: 20px;
            }

            .receipt-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
            }

            .logo {
              text-align: center;
              margin-bottom: 20px;
            }

            .logo img {
              max-height: 80px;
            }

            .company-info {
              margin-bottom: 20px;
            }

            .info-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
            }

            .info-item span {
              font-weight: bold;
              margin-right: 10px;
            }

            .customer-info {
              margin-bottom: 20px;
            }

            .transaction-info {
              margin-bottom: 20px;
            }

            .transaction-info table {
              width: 100%;
            }

            .transaction-info table td {
              padding: 8px 0;
              border-bottom: 1px solid #ccc;
            }

            .thanks-msg {
              text-align: center;
            }

            </style>
        </head>
        <body>
        <div class="container" id="receipt">
        <div class="logo">
          <img src="https://mentationtech.in/wp-content/uploads/2020/09/Mentation-Logo.png" alt="Company Logo">
        </div>

        <div class="company-info">
          <div class="info-item">
            <span>Company Name: </span>
            <span>MENTATION TECHNOLOGIES </span>
          </div>
          <div class="info-item">
            <span>Address:</span>
            <span>Office 101, Nitin Shanti Nagar, B-69, Shanti Nagar Sector 1, Mira Road (E) Thane 401107- Maharashtra</span>
          </div>
          <div class="info-item">
            <span>Contact:</span>
            <span>Your Company Contact Info</span>
          </div>
        </div>

        <div class="customer-info">
          <h5>Customer Information:</h5>
          <div class="info-item">
            <span>Customer Name:</span>
            <span>${ this.aboutOrder.Profile.first_name} ${ this.aboutOrder.Profile.last_name}</span>
          </div>
          <div class="info-item">
            <span>Order ID:</span>
            <span>${ this.aboutOrder.order_id}</span>
          </div>
          <div class="info-item">

          </div>
        </div>

        <div class="transaction-info">
          <h5>Transaction Information:</h5>
          <table>
            <tr>
              <td>Transaction Time:</td>
              <td>${this.transactionInfo.createdAt}</td>
            </tr>
            <tr>
              <td>Pending Amount:</td>
              <td>${ this.aboutOrder.pending_payment}</td>
            </tr>
            <tr>
              <td>Transaction Amount:</td>
              <td>${ this.transactionInfo.payment}</td>
            </tr>
            <tr>
              <td>Transaction ID:</td>
              <td>${ this.transactionInfo.transaction_id}</td>
            </tr>
            <tr>
              <td>Remark:</td>
              <td>${ this.transactionInfo.remark}</td>
            </tr>
          </table>
    </div>

    <div class="thanks-msg">
      <p>Thank you for your payment!</p>
    </div>
  </div>
        </body>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

        </html>
      `;

      const file = new Blob([receiptContent], { type: 'text/html' });

      // Create a temporary URL for the file
      const url = URL.createObjectURL(file);

      // Create a temporary link and simulate a click event
      const link = document.createElement('a');
      link.href = url;
      link.download = 'payment_receipt.html';
      link.click();

      // Cleanup the temporary URL
      URL.revokeObjectURL(url);
  }


  printReceipt() {
    // Generate the receipt content
    const receiptContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Payment Receipt</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

        <style>
        body {
          padding: 20px;
        }

        .receipt-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .logo {
          text-align: center;
          margin-bottom: 20px;
        }

        .logo img {
          max-height: 80px;
        }

        .company-info {
          margin-bottom: 20px;
        }

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .info-item span {
          font-weight: bold;
          margin-right: 10px;
        }

        .customer-info {
          margin-bottom: 20px;
        }

        .transaction-info {
          margin-bottom: 20px;
        }

        .transaction-info table {
          width: 100%;
        }

        .transaction-info table td {
          padding: 8px 0;
          border-bottom: 1px solid #ccc;
        }

        .thanks-msg {
          text-align: center;
        }

        </style>
    </head>
    <body>
    <div class="container" id="receipt">
    <div class="logo">
      <img src="https://mentationtech.in/wp-content/uploads/2020/09/Mentation-Logo.png" alt="Company Logo">
    </div>

    <div class="company-info">
      <div class="info-item">
        <span>Company Name: </span>
        <span>MENTATION TECHNOLOGIES </span>
      </div>
      <div class="info-item">
        <span>Address:</span>
        <span>Office 101, Nitin Shanti Nagar, B-69, Shanti Nagar Sector 1, Mira Road (E) Thane 401107- Maharashtra</span>
      </div>
      <div class="info-item">
        <span>Contact:</span>
        <span>Your Company Contact Info</span>
      </div>
    </div>

    <div class="customer-info">
      <h5>Customer Information:</h5>
      <div class="info-item">
        <span>Customer Name:</span>
        <span>${ this.aboutOrder.Profile.first_name} ${ this.aboutOrder.Profile.last_name}</span>
      </div>
      <div class="info-item">
        <span>Order ID:</span>
        <span>${ this.aboutOrder.order_id}</span>
      </div>
      <div class="info-item">

      </div>
    </div>

    <div class="transaction-info">
      <h5>Transaction Information:</h5>
      <table>
        <tr>
          <td>Transaction Time:</td>
          <td>${this.transactionInfo.createdAt}</td>
        </tr>
        <tr>
          <td>Pending Amount:</td>
          <td>${ this.aboutOrder.pending_payment}</td>
        </tr>
        <tr>
          <td>Transaction Amount:</td>
          <td>${ this.transactionInfo.payment}</td>
        </tr>
        <tr>
          <td>Transaction ID:</td>
          <td>${ this.transactionInfo.transaction_id}</td>
        </tr>
        <tr>
          <td>Remark:</td>
          <td>${ this.transactionInfo.remark}</td>
        </tr>
      </table>
</div>

<div class="thanks-msg">
  <p>Thank you for your payment!</p>
</div>
</div>
    </body>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    </html>
    `;

    // Open a new window and write the receipt content
    const printWindow = window.open('', '_blank');
    if(printWindow) printWindow.document.write(receiptContent);
    if(printWindow)printWindow.document.close();

    // Print the window
    if(printWindow) printWindow.print();
  }





  changeOrder() {
    // this.getOrderId();
    localStorage.setItem('order_id', this.order_id);
    this.getPendingAmount();
  }


  payAmount(order_id:any){
    this.viewPaymentSection = true;
    this.order_id = order_id;
    this.getPendingAmount();
    this.getOrderByOrder_id();
  }

    getAllOrder(status: string) {
      this.viewOrderTable = true;
      if(this.profile_id==0)alert('please put sales id...')
      else {
        this.http
        .get(
          `${environment.BASE_Url}/order/by-profile/${this.profile_id}/${status}`
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
  }


  makePayment(data: any) {
    this.viewPayment = true;

    const body = {
      payment: data.payment,
      remark: data.remark,
      payment_mode: data.payment_mode,
      profile_id: this.authloginService.getProfile_id,
    };
    this.http
      .post(`${environment.BASE_Url}/payment/${data.order_id}`, body)
      .subscribe({
        next: (res: any) => {
         this.transactionInfo = res.data;
          localStorage.removeItem('order_id');
          // this.router.navigate(['sales'])
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


  // get pending amount
  getPendingAmount() {
    this.http
      .get(`${environment.BASE_Url}/order/${this.order_id}`)
      .subscribe({
        next: (res: any) => {
          if (res.success == 0) alert(res.msg);
          else this.pending_payment = res.data.pending_payment;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAllTransactionByOrderId() {
    this.http
      .get(`${environment.BASE_Url}/payment/history/${this.order_id}`)
      .subscribe({
        next: (res: any) => {
          this.transactionHistoryData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  changeViewHistory() {
    if (this.viewHistory) this.viewHistory = false;
    else this.viewHistory = true;
  }


  // get all about order using order id
  getOrderByOrder_id(){
    this.http.get(`${environment.BASE_Url}/order/${this.order_id}`).subscribe({
      next:(res:any)=>{
        this.aboutOrder = res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



  // get all customer by sales id
  getAllCustomerBySalesId(): void {
      if(this.sales_id == 0){
        alert('please select sales');
        this.sales_id = -1;
      }
      else {
        this.http
        .get(
          `${environment.BASE_Url}/customer/by-sales/${this.sales_id}`
        )
        .subscribe({
          next: (res: any) => {
            console.log(res)
            this.customersData = res.data;
          },

          error: (err) => {
            this.router.navigate(['error']);
          },
        });
      }
  }



  setSales_id(sales_id: any) {
    console.log(sales_id)
    this.sales_id = sales_id;
  }

  // get all sales
  getAllSales(){
    this.http.get(`${environment.BASE_Url}/profile/sales/sales-data/`).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.salesData=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  };


  // get all order by customer id
  getAllOrderByCustomerId(customer_id:any){
    this.viewOrderTable = true;
      this.http.get(`${environment.BASE_Url}/order/get-all-order/${customer_id}/`).subscribe({
        next:(res:any)=>{
          if(res.data.length==0)alert(`no any order...`)
          console.log(res);
          this.orderProducts = res.data;
        },error:(err)=>{
          console.log(err)
        }
      })
  }
}
