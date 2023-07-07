import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthloginService } from './authlogin.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(
    private http: HttpClient,
    private authloginService: AuthloginService,
    private router: Router
  ) {}

  // get all Order by sales id
  getAllOrder(status: string): any {
    console.log(this.authloginService.getProfile_id());
    this.http
      .get(
        `${
          environment.BASE_Url
        }/order/by-profile/${this.authloginService.getProfile_id()}/${status}`
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          return res;
        },
        error: (err) => {
          this.router.navigate(['error']);
        },
      });
  }

  // export
  exportTableToCSV(): void {
    const table = document.getElementById(
      'transaction-table'
    ) as HTMLTableElement;
    const csv = [];
    const rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
      const row = [];
      const cols = rows[i].querySelectorAll('td, th');

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].textContent);
      }

      csv.push(row.join(','));
    }

    const csvContent = csv.join('\n');
    const csvFile = new Blob([csvContent], { type: 'text/csv' });

    const downloadLink = document.createElement('a');
    downloadLink.download = 'table.csv';
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
