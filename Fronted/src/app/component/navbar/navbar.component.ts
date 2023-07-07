import { Router } from '@angular/router';
import { AuthloginService } from './../../service/authlogin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authloginService: AuthloginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.authloginService.getRole());
  }

  logout() {
    this.authloginService.clear();
    this.router.navigate(['/']);
  }
}
