import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-online-payment-account',
  templateUrl: './online-payment-account.component.html',
  styleUrls: ['./online-payment-account.component.scss']
})
export class OnlinePaymentAccountComponent implements OnInit {
  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  // used for spinner
  fetchingPayments = false;

  onlinePaymentData: any

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  
  moveBack() {
    this.location.back();
  }

}
