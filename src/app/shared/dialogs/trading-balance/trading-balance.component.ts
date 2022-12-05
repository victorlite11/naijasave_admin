import { Component, Inject, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from '../../models/company-model/company-model';
import { CompanyService } from '../../services/company/company.service';
import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-trading-balance',
  templateUrl: './trading-balance.component.html',
  styleUrls: ['./trading-balance.component.scss']
})
export class TradingBalanceComponent implements OnInit {
  company: CompanyModel = new CompanyModel();
  title = "DCA";
  name = "Company Name";
  username = "";
  amount =  100;
  companyAuthorizationPassword = "";
  transacting = false;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  constructor(
    private companyService: CompanyService,
    private location: Location,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.route.queryParams.subscribe(async query => {
      this.company = await this.companyService.getCompanyData();
      this.company.basicInformation!!.dateCreated = new Date(this.company.basicInformation!!.dateCreated!!).toDateString()
      this.username = query.username;
    })
  }

  async fundAdminAccount() {
    this.transacting = true;
    await this.paymentService.fundAdminAccount({
      amount: this.amount,
      password: this.companyAuthorizationPassword,
      admin_username: this.username
    }).then(async response => {
      this.transacting = false;

      if(response.success) {
        this.feedback = response.message;
        this.type = "success";
        await this.init()
      } else {
        this.feedback = response.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

  async debitAdminAccount() {
    this.transacting = true;
    await this.paymentService.debitAdminAccount({
      amount: this.amount,
      password: this.companyAuthorizationPassword,
      admin_username: this.username
    }).then(async response => {
      this.transacting = false;

      if(response.success) {
        this.feedback = response.message;
        this.type = "success";
        this.init()
      } else {
        this.feedback = response.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

}
