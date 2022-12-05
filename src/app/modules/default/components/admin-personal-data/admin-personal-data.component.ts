import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { CompanyService } from 'src/app/shared/services/company/company.service';

@Component({
  selector: 'app-admin-personal-data',
  templateUrl: './admin-personal-data.component.html',
  styleUrls: ['./admin-personal-data.component.scss']
})
export class AdminPersonalDataComponent implements OnInit {
  // admin
  admin = new AdminModel();
  fetchingPersonalData = true;
  accountType: string = "unknown";

  title = "Personal Data";
  name = "Full Name";

  constructor(
    private adminService: AdminService,
    private compService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

   ngOnInit(): void {
    this.init();
  }
  init(): void {
    this.fetchingPersonalData = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.admin_id) {
        this.route.data.subscribe(async data => {
          this.admin = await this.adminService.getAdmin(data.admin_id);
          this.admin!!.basicInformation!!.dateOfBirth = new Date(this.admin.basicInformation!!.dateOfBirth).toDateString()
          this.fetchingPersonalData = false;
        })
      } else {
        this.admin = await this.adminService.getAdmin(query.admin_id);
          this.admin!!.basicInformation!!.dateOfBirth = new Date(this.admin.basicInformation!!.dateOfBirth).toDateString()
          this.fetchingPersonalData = false;
      }
    })
  }
}

