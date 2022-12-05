import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SMSProforma } from '../../interface/shared-interface';
import { ContributorModel } from '../../models/contributor-model/contributor-model';
import { ContributorsService } from '../../services/contributors/contributors.service';
import { SmsService } from '../../services/sms/sms.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss']
})
export class ChangeUsernameComponent implements OnInit {
  contributor_username = "";
  fetchingUsername = false;
  sendSMS = false;
  proforma: SMSProforma = new SMSProforma();
  constructor(
    private dialogRef: MatDialogRef<ChangeUsernameComponent>,
    private contributorsService: ContributorsService,
    private smsService: SmsService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.fetchingUsername = true;
    this.init()
  }

  async init() {
    this.proforma = await this.smsService.getSMSProforma('account-change');
    this.contributor_username = await (await this.contributorsService.getContributor(this.data.contributor_id)).credentials?.username as string;
    this.fetchingUsername = false;
  }

  async changeUsername() {
    if(this.sendSMS) {
      this.contributorsService.changeUsername({sms: this.proforma, id: this.data.contributor_id, username: this.contributor_username}).then(r => {
        this.dialogRef.close(r);
      });
    } else {
      this.contributorsService.changeUsername({id: this.data.contributor_id, username: this.contributor_username}).then(r => {
        this.dialogRef.close(r);
      })
    }
  }

}
