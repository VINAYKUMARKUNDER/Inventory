import { Router } from '@angular/router';
import { OprationService } from './../../service/opration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opration',
  templateUrl: './opration.component.html',
  styleUrls: ['./opration.component.css'],
})
export class OprationComponent implements OnInit {
  acceptedProduct: any = [];
  viewStatus: string = 'view-order';
  manageOrder: any = [];
  Imei_Number: any = [];
  num_Of_Product: number = 0;
  manageOrder_id: number = 0;
  dispatch_type: string = 'null';
  dispatch_status: boolean = false;
  dispatch_order: number = 0;

  constructor(
    private oprationService: OprationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAcceptData();
  }

  // change view status
  changeViewStatus(status: string): void {
    this.viewStatus = status;
  }

  changeOrder_type(dispatch_Value: string) {
    this.dispatch_type = dispatch_Value;
  }

  changeDispatchStatus(order_id: number) {
    this.dispatch_order = order_id;
    if (this.dispatch_status) this.dispatch_status = false;
    else this.dispatch_status = true;
  }

  num_Of_ProductsAnd_OrderId(num_Of_Product: number, manageOrder_id: number) {
    this.num_Of_Product = num_Of_Product;
    this.manageOrder_id = manageOrder_id;
  }

  // get all accept data
  getAllAcceptData() {
    this.oprationService.getAllAcceptedOrder().subscribe({
      next: (res: any) => {
        this.acceptedProduct = res.data;
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }

  // add imei number
  getAllManageDataByOrderId(order_id: number) {
    this.oprationService.getAllManageDatasByOrderId(order_id).subscribe({
      next: (res: any) => {
        this.manageOrder = res.manageOrder;
        console.log(this.manageOrder);
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  addImeiInArray(imei: any) {
    this.Imei_Number.push(imei.imei);
    console.log(JSON.stringify(this.Imei_Number));
  }

  // add imei in database
  addImeiInDatabase() {
    if (this.Imei_Number.length < this.num_Of_Product) {
      alert(`plese add all Imei number`);
    } else {
      this.oprationService
        .addInDatabase(JSON.stringify(this.Imei_Number), this.manageOrder_id)
        .subscribe({
          next: (res: any) => {
            alert(res.msg);
            this.viewStatus = 'view-order';
          },
          error: (err) => {
            this.router.navigate(['error']);
          },
        });
    }
  }

  // dispatch order
  dispatchOrder(order_id: number) {
    this.oprationService.getAllManageDatasByOrderId(order_id).subscribe({
      next: (res: any) => {
        this.manageOrder = res.manageOrder;
        console.log(this.manageOrder);
        let flag = true;
        for (let i = 0; i < this.manageOrder.length; i++) {
          if (this.manageOrder[i].product_IMEIs == null) {
            alert(`please add all product Imei number...`);
            flag = false;
            break;
          }
        }

        if (flag)
          this.oprationService
            .changeDispatchType(this.dispatch_type, order_id)
            .subscribe({
              next: (res: any) => {
                alert(res.msg);
              },
              error: (err) => {
                this.router.navigate(['error']);
              },
            });
      },
      error: (err) => {
        this.router.navigate(['error']);
      },
    });
  }
}
