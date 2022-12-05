import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewAdminModel } from 'src/app/shared/models/new-admin-model/new-admin-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss']
})
export class NewAdminComponent implements OnInit {
  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl(''),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    gender: new FormControl('male', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    identity: new FormControl('super', Validators.required),
    localGovernment: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  private admin = new NewAdminModel();
  private overseer_id: string = "";
  creatingAdmin = false;
  title = "NaijaSave";
  count = "Create New Admin"
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) { 
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.overseer_id = data.admin_id;
    })
  }

  async submit() {
    this.admin.address = this.form.value.address;
    this.admin.country = this.form.value.nationality;
    this.admin.dateOfBirth = this.form.value.dateOfBirth;
    this.admin.email = this.form.value.email;
    this.admin.gender = this.form.value.gender;
    this.admin.identity = this.form.value.identity;
    this.admin.name = this.form.value.name;
    this.admin.overseer_id = this.overseer_id;
    this.admin.password = this.form.value.password;
    this.admin.phoneNumber = this.form.value.phoneNumber;
    this.admin.starting_balance = 0;
    this.admin.state = this.form.value.state;

    this.creatingAdmin = true;
    await this.adminService.createNewAdmin(this.admin).then(response => {
      this.creatingAdmin = false;
      
      if (response.success) {
        this.feedback = response.message;
        this.type = "success";
        this.form.reset()
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
