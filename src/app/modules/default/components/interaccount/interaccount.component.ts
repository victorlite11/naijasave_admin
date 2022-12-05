import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'rxjs';
import { SearchComponent } from 'src/app/shared/dialogs/search/search.component';
import { SearchSelection } from 'src/app/shared/interface/shared-interface';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

import Swal from 'sweetalert2';

interface Users {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-interaccount',
  templateUrl: './interaccount.component.html',
  styleUrls: ['./interaccount.component.scss']
})

export class InteraccountComponent implements OnInit {

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";


  users: Users[] = [];
  usersLoading = false;
  performingTransaction = false;
  phone: string = '';
  title = "Contributors Interaccount"
  admin = new AdminModel();

  selectedUser = "No contributor selected"
  
  form: FormGroup = new FormGroup({
    selectedUser: new FormControl(null,Validators.required),
    enteredAmount: new FormControl(null,Validators.required),
    transactionDate: new FormControl(null,Validators.required),
    statement: new FormControl(null),
    sendSmsNotification: new FormControl(false),
    purpose: new FormControl("DailySavings",Validators.required)
  })
  availableBalance = '-';
  readableDate = new Date(this.form.value.transactionDate).toDateString()
  constructor(
    private subordinatesService: SubordinatesService,
    private contributorsService: ContributorsService,
    private adminService: AdminService,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    @Inject('SEARCH_SELECTION_KEY') private searchSelectionKey : string,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.route.data.subscribe(async data => {
      let admin = await this.adminService.getAdmin(data.admin_id);
      this.admin = admin;
      this.availableBalance = `${admin.account?.balance}`
    })

    this.reconstructDate()

    if (sessionStorage.getItem(this.searchSelectionKey)) {
      let searchSelection : SearchSelection = JSON.parse(sessionStorage.getItem(this.searchSelectionKey)!!)
      this.selectedUser = `${searchSelection.name}`;

      this.form.setValue({
        selectedUser: searchSelection.contributorId,
        enteredAmount: null,
        transactionDate: new Date().toLocaleDateString(),
        statement: null,
        sendSmsNotification: false,
        purpose: "DailySavings"
      });

      sessionStorage.removeItem(this.searchSelectionKey);
      this.reconstructDate();
    }
  }

  reconstructDate() {
    this.readableDate = new Date(this.form.value.transactionDate).toDateString();
  }
  
  onChange(mrChange: MatRadioChange) {
    this.usersLoading = true;
    this.users = [];

    this.route.data.subscribe(async data => {
      await this.contributorsService.fetchSpecificContributors({
        identity: mrChange.value
      }).then(contributors => {
        this.usersLoading = false;
        (<ContributorModel[]>contributors).forEach(contributor => {
          this.users.push({
            value: contributor._id as string,
            viewValue:`${contributor.basicInformation!!.name}(${contributor.credentials!!.phoneNumber})`
          });
        });
      });
    });
 }

 openSearchPortal() {
  this.router.navigate(['search-portal'],{relativeTo: this.route.parent, queryParams : {
    destination : "interaccount"
  }});
 }

 
 async debit() {

  this.route.data.subscribe(async data => {
    this.performingTransaction = true;
    await this.paymentService.debit({
      from: this.form.value.selectedUser,
      to: data.admin_id,
      check: false,
      date: this.form.value.transactionDate,
      amount: this.form.value.enteredAmount,
      purpose: this.form.value.purpose,
      method: 'CASH',
      send_sms_notification: this.form.value.sendSmsNotification,
      statement: this.form.value.statement
    }).then(async r => {
      this.performingTransaction = false;
      if (r.success) {
        this.feedback = r.message;
        this.type = "success";

        await this.init();
      } else {
        this.feedback = r.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)

    })
  })

 }

 credit() {
  this.route.data.subscribe(async data => {
    this.performingTransaction = true;
    await this.paymentService.credit({
      from: data.admin_id,
      to: this.form.value.selectedUser,
      date: this.form.value.transactionDate,
      amount: this.form.value.enteredAmount,
      purpose: this.form.value.purpose,
      method: 'CASH',
      send_sms_notification: this.form.value.sendSmsNotification,
      statement: this.form.value.statement
    }).then(async r => {
      this.performingTransaction = false;
      if (r.success) {
        this.feedback = r.message;
        this.type = "success";

        await this.init();
      } else {
        this.feedback = r.message;
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  })
 }

}
