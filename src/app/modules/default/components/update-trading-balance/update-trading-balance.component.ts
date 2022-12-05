import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from 'src/app/shared/models/company-model/company-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-update-trading-balance',
  templateUrl: './update-trading-balance.component.html',
  styleUrls: ['./update-trading-balance.component.scss']
})
export class UpdateTradingBalanceComponent implements OnInit {
  company: CompanyModel = new CompanyModel();
  title = "UTB";
  name = "Company Name";
  username = "";
  amount = 0;
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
      this.amount = this.company.account?.tradingBalance as number;
      this.username = query.username;
    })
  }

  async updateTradingBal() {
    this.transacting = true;
    await this.paymentService.updateTradingBalance({
      amount: this.amount,
      password: this.companyAuthorizationPassword,
      admin_username: this.username
    }).then(async r => {
      this.transacting = false;

      if(r.success) {
        this.feedback = r.message;
        this.type = "success";
        this.init()
      } else {
        this.feedback = r.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

}
