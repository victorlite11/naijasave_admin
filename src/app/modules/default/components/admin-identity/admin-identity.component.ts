import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminIdentityModel } from 'src/app/shared/models/admin-model/admin-model';
import { IdentityModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-admin-identity',
  templateUrl: './admin-identity.component.html',
  styleUrls: ['./admin-identity.component.scss']
})
export class AdminIdentityComponent implements OnInit {
  title="Identity";
  name="Account Type";
  accountType = "Unknown";
  identity: AdminIdentityModel = new AdminIdentityModel()
  fetchingIdentity = true;
  updatingIdentity = false;
  admin_id: string = "";
  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingIdentity = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.admin_id) {
        this.route.data.subscribe(async data => {
          this.identity = await this.identityService.fetchAdminIdentity(data.admin_id);
          this.fetchingIdentity = false;
          this.admin_id = data.admin_id;
          if(this.identity.isHeadAdmin) {
            this.accountType = "Head Admin";
          } else if(this.identity.isSuperAdmin) {
            this.accountType = "Super Admin";
          } else if(this.identity.isSubAdmin) {
            this.accountType = "Sub Admin";
          } else {
            this.accountType = "UNKNOWN"
          } 
        })      
      } else {
        this.identity = await this.identityService.fetchAdminIdentity(query.admin_id);
          this.fetchingIdentity = false;
          this.admin_id = query.admin_id;
          if(this.identity.isHeadAdmin) {
            this.accountType = "Head Admin";
          } else if(this.identity.isSuperAdmin) {
            this.accountType = "Super Admin";
          } else if(this.identity.isSubAdmin) {
            this.accountType = "Sub Admin";
          } else {
            this.accountType = "UNKNOWN"
          }
      }
    })
  }

  async updateAdminIdentity(interest: "head" | "super" | "sub") {
    let interested_identity = {interested_identity: interest};
    this.updatingIdentity = true;
    await this.identityService.changeAdminIdentity(this.admin_id, interested_identity).then(async result => {
      this.updatingIdentity = false;
      await this.init();
    })
  }

}

