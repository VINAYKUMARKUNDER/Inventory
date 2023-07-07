import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';
import { ComponentComponent } from './component/component.component';
import { SalesComponent } from './component/sales/sales.component';
import { AdminComponent } from './component/admin/admin.component';
import { ProductComponent } from './component/product/product.component';
import { ReportComponent } from './component/report/report.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { Routes ,RouterModule} from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { loginGuard } from './Auth/login.guard';
import { AuthInterceptorptor } from './Auth/auth.interceptor';
import { LoginService } from './service/login.service';
import { salesGuard } from './Auth/sales.guard';
import { adminGuard } from './Auth/admin.guard';
import { OprationComponent } from './component/opration/opration.component';
import { CustomerComponent } from './component/customer/customer.component';
import { oprationGuard } from './Auth/opration.guard';
import { ErrorComponent } from './component/error/error.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PaymentComponent } from './component/payment/payment.component';
import { paymentGuard } from './Auth/payment.guard';




const appRoutes:Routes= [{
  component:HomeComponent,
  path:''
},
{
  component: SignupComponent,
  path:'signup'
},
{
  component:AdminComponent,
  path:'admin',
  canActivate:[adminGuard]
},
{
  component:ProductComponent,
  path:'product'
},
{
  component:SalesComponent,
  path:'sales',
  canActivate:[salesGuard]
},
{
  component:LoginComponent,
  path:'login'
},
{
  component: OprationComponent,
  path:'opration',
  canActivate:[oprationGuard]
},

{
  component: CustomerComponent,
  path:'customer'
},
{
  component:PaymentComponent,
  path:'payment',
  canActivate: [paymentGuard]
},
{
  component:ErrorComponent,
  path:'error'
},
{
  component:PageNotFoundComponent,
  path:'**'
},

]


@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    SalesComponent,
    AdminComponent,
    ProductComponent,
    ReportComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    OprationComponent,
    CustomerComponent,
    ErrorComponent,
    PageNotFoundComponent,
    PaymentComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule
  ],
  providers: [
    // loginGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorptor,
    //   multi:true
    // },
    // LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
