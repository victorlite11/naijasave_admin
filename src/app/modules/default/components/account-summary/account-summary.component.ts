import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/shared/models/company-model/company-model';
import { AccountSummary } from 'src/app/shared/models/payment/payment-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {
  fetchingAccountSummary = true;
  accountSummary = new AccountSummary();
  company = new CompanyModel();
  totalCommissionsSummary = 0;
  constructor(
    private transactionsService: TransactionsService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.transactionsService.getAccountSummary().then(summary => {
      this.accountSummary = summary;
      this.totalCommissionsSummary = this.accountSummary.commissions.company + this.accountSummary.commissions.subContributors + this.accountSummary.commissions.superContributors
    });

    this.company = await this.companyService.getCompanyData();

    this.fetchingAccountSummary = false;
  }

}
