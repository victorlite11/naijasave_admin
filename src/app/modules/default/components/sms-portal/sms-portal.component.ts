import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SMSProforma } from 'src/app/shared/interface/shared-interface';
import { CompanySettingsModel } from 'src/app/shared/models/company-model/company-model';
import { CompanyService } from 'src/app/shared/services/company/company.service';
import { SmsService } from 'src/app/shared/services/sms/sms.service';

@Component({
  selector: 'app-sms-portal',
  templateUrl: './sms-portal.component.html',
  styleUrls: ['./sms-portal.component.scss']
})
export class SmsPortalComponent implements OnInit {
  title = "SMS Portal";
  companySettings = new CompanySettingsModel()
  fetchingSms = false;
  smsProformas: SMSProforma[] = [];

  constructor(
    private smsService: SmsService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingSms = true;
    this.smsProformas = await this.smsService.getAllSMSProforma()
    this.fetchingSms = false;
    this.companySettings = (await this.companyService.getCompanyData()).settings!!;
  }

  navigateToSendSms() {
    this.router.navigate(['sms-proforma'], {relativeTo: this.route.parent});
  }

  navigateToCreateSMSProforma() {
    this.router.navigate(['sms-proforma'], {relativeTo: this.route.parent});
  }

  async updateCompanyData(ev: any) {
    await this.companyService.updateCompanySettings(this.companySettings);
  }

}
