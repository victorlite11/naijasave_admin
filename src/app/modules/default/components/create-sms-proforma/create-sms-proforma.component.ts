import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementModel, Category, SMSProforma } from 'src/app/shared/interface/shared-interface';
import { AnnouncementsService } from 'src/app/shared/services/announcements/announcements.service';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';
import { SmsService } from 'src/app/shared/services/sms/sms.service';

@Component({
  selector: 'app-create-sms-proforma',
  templateUrl: './create-sms-proforma.component.html',
  styleUrls: ['./create-sms-proforma.component.scss']
})
export class CreateSmsProformaComponent implements OnInit {
  title = "Create SMS Proforma";
  btnText = "Create";
  smsProforma = new SMSProforma();
  creating = false;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async query => {
      if(query.for) {
        this.title = "Edit SMS Proforma";
        this.btnText = "Update";
        this.smsProforma = await this.smsService.getSMSProforma(query.for);
      }
    });
  }

  create() {

    this.creating = true;
    this.route.queryParams.subscribe(async query => {
      if(query.for) {
        await this.updateSmsProforma(this.smsProforma);
        this.creating = false;
      } else {
        await this.createNewSmsProforma(this.smsProforma);
        this.creating = false;
      }
    })
  }

  async createNewSmsProforma(proforma: SMSProforma) {
    await this.smsService.createSMSProforma(proforma).then(r => {
      if (r.success) {
        this.feedback = r.message;
        this.type = "success";
        this.location.back();
      } else {
        this.feedback = r.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

  async updateSmsProforma(proforma: SMSProforma) {
    await this.smsService.updateSMSProforma(proforma).then(r => {
      if (r.success) {
        this.feedback = r.message;
        this.type = "success";
        this.location.back();
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
