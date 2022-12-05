import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminPrivilegeModel } from 'src/app/shared/models/admin-model/admin-model';
import { PrivilegeService } from 'src/app/shared/services/privilege/privilege.service';

@Component({
  selector: 'app-admin-privilege',
  templateUrl: './admin-privilege.component.html',
  styleUrls: ['./admin-privilege.component.scss']
})
export class AdminPrivilegeComponent implements OnInit {
  title = "Admin Privilege"
  privilege: AdminPrivilegeModel = new AdminPrivilegeModel();
  admin_id: string = ""
  fetchingPrivilege = true;
  updatingPrivilege = false;
  constructor(
    private privilegeService: PrivilegeService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingPrivilege = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.admin_id) {
        this.route.data.subscribe(async data => {
          this.admin_id = data.admin_id;
          this.privilege = await this.privilegeService.fetchAdminPrivilege(data.admin_id);
          this.fetchingPrivilege = false;
        })
      } else {
        this.admin_id = query.admin_id;
        this.privilege = await this.privilegeService.fetchAdminPrivilege(query.admin_id);
        this.fetchingPrivilege = false;
      }
    })
  }
 
  async updatePrivilege(ev: any) {
    this.updatingPrivilege = true;
    await this.privilegeService.changeAdminPrivilege(this.admin_id, this.privilege).then(async result => {
      this.updatingPrivilege = false;
      await this.init();
    })

  }

}
