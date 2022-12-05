import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsCountResponse } from 'src/app/shared/interface/shared-interface';
import { RequestsService } from 'src/app/shared/services/requests/requests.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requestsCount = new RequestsCountResponse();
  title = "Requests";
  name = "Total Requests"

  countingRequests = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: RequestsService
  ) { }

  ngOnInit(): void {
    this.countingRequests = true;
    this.route.data.subscribe(async data => {
      await this.requestsService.countRequests().then( response => {
        this.requestsCount = response;
        this.countingRequests = false;
      });
    });
  }

  openWithdrawalRequests() {
    this.router.navigateByUrl('/withdrawalrequests')
  }

  openDepositRequests() {
    this.router.navigateByUrl('/depositrequests');
  }

  openSignupRequests() {
    this.router.navigateByUrl('/signuprequests');
  }

}
