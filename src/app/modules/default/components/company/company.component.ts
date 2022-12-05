import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from 'src/app/shared/models/company-model/company-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: CompanyModel = new CompanyModel();
  title = "Company Profile";
  name = "Company Name";
  username = "";
  constructor(
    private companyService: CompanyService,
    private location: Location,
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

  openAccountSummary() {
    this.router.navigate(['acccount-summary'], {
      queryParams : {
        username : this.username
      }
    })
  }

  moveBack() {
    this.location.back();
  }

  navigateToUpdateTradingBal() {
    this.router.navigate(['update-trading-balance'], {
      queryParams : {
        username : this.username
      }
    })
  }

  navigateToDebitCreditAdmins() {
    this.router.navigate(['credit-debit-admin'], {
      queryParams : {
        username : this.username
      }
    })
  }

  async creditTradingBalance() {

  }

  navigateToCompanyCommission() {
    this.router.navigate(['company-commission'], {
      queryParams : {
        username : this.username
      }
    })
  }

  async debitTradingBalance() {
    this.router.navigate(['trading-balance'], {
      queryParams : {
        username : this.username
      }
    })
  }

}
