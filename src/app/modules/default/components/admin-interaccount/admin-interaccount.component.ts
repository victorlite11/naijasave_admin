import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { PaymentService } from 'src/app/shared/services/payment/payment.service';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';
import Swal from 'sweetalert2';

interface Admin {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-admin-interaccount',
  templateUrl: './admin-interaccount.component.html',
  styleUrls: ['./admin-interaccount.component.scss']
})
export class AdminInteraccountComponent implements OnInit {
  users: Admin[] = [];
  usersLoading = false;
  performingTransaction = false;
  title = "Admin Interaccount";
  admin = new AdminModel();

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  form: FormGroup = new FormGroup({
    selectedUser: new FormControl(null,Validators.required),
    enteredAmount: new FormControl(null,Validators.required),
    sendSmsNotification: new FormControl(false),
    transactionDate: new FormControl(null,Validators.required),
    statement: new FormControl(null),
    purpose: new FormControl("OtherTransactions",Validators.required)
  })
  availableBalance = '-';
  constructor(
    private adminService: AdminService,
    private paymentService: PaymentService,
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

      this.usersLoading = true;
      this.users = [];
      await this.adminService.getAdmins().then(admins => {
        this.usersLoading = false;
        (<AdminModel[]>admins).filter(admin => admin._id !== data.admin_id).forEach(admin => {
          this.users.push({
            value: admin._id as string,
            viewValue:`${admin.credentials!!.username}`
          });
        });
      });
    })
  }

 
 async debit() {

  this.route.data.subscribe(async data => {
    this.performingTransaction = true;
    await this.paymentService.debit({
      from: this.form.value.selectedUser,
      to: data.admin_id,
      date: this.form.value.transactionDate,
      amount: this.form.value.enteredAmount,
      purpose: this.form.value.purpose,
      check: true,
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
      await this.init();
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
      await this.init();
    })
  })
 }

}
