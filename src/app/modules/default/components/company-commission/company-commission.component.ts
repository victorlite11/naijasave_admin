import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { CompanyModel } from 'src/app/shared/models/company-model/company-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { TransactionsService } from 'src/app/shared/services/transactions/transactions.service';
import { OverseerCommissionSummary } from 'src/app/shared/models/payment/payment-model';
import { BottomSheetData, BottomSheetSwitch } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';

@Component({
  selector: 'app-company-commission',
  templateUrl: './company-commission.component.html',
  styleUrls: ['./company-commission.component.scss']
})
export class CompanyCommissionComponent implements OnInit {

  company = new CompanyModel()
  subContributorsCommissions : OverseerCommissionSummary[] = []
  superContributorsCommissions : OverseerCommissionSummary[] = []

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  // compute commission
  computingCommission = false;

  paymentData: {name: string, balance: number, overseer_id: string} = {name: "", balance: 0, overseer_id: ""}

  @ViewChild('bottomSheet') bottomSheet: any;
  bottomSheetData : BottomSheetData = {
    heading: {text: "Please choose your preferred payment method", color: "#e0b557"},
    buttons: [
      {name: "Online", bgColor: '#f55f5f', onClick: ($ev) => this.payOnline()},
      {name: "Cash", bgColor: 'rgb(130, 50, 205)', onClick: ($ev) => this.payCash()}
    ]
  }

  constructor(
    private companyService: CompanyService,
    private transactionsService: TransactionsService,
    private route : ActivatedRoute,
    private paymentService: PaymentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.init()
  }

  async init() {
    this.computingCommission = true;
    this.route.queryParams.subscribe(async query => {
      this.company = await this.companyService.getCompanyData();

      await this.companyService.computeCommission();
      this.computingCommission = false;
      this.subContributorsCommissions = await this.transactionsService.getOverseersCommissionsSummary("sub");
      this.superContributorsCommissions = await this.transactionsService.getOverseersCommissionsSummary("super");
    })
  }

  makePayment(data: any) {
    this.paymentData = data;
    console.log(this.paymentData)
    BottomSheetSwitch.ensue(this.bottomSheet);
  }

  moveBack() {
    this.location.back();
  }

  
  async payOnline() {
    BottomSheetSwitch.desue(this.bottomSheet);
    this.type = "success";
    this.feedback = 'This feature will be available soon'
    setTimeout(() => {
      this.feedback = ""
    }, 5100)
  }

  async payCash() {
    BottomSheetSwitch.desue(this.bottomSheet)

    if(this.paymentData.overseer_id == "" || this.paymentData.balance == 0) {
      this.type = "error";
      this.feedback = "Overseer unknown";

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    }

    await this.paymentService.payOverseerCommission({
      overseer_id : this.paymentData.overseer_id,
      balance: this.paymentData.balance,
      name: this.paymentData.name
    }).then(r => {
      if (r.success) {
        this.feedback = r.message
        this.type = "success";
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
