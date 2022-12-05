import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrivilegeModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { PrivilegeService } from 'src/app/shared/services/privilege/privilege.service';

interface ISubordinate {
  name: string;
  phone: string;
}

@Component({
  selector: 'app-priviledge',
  templateUrl: './priviledge.component.html',
  styleUrls: ['./priviledge.component.scss']
}) 

export class PriviledgeComponent implements OnInit {
  title = "Privilege"
  privilege: PrivilegeModel = new PrivilegeModel();
  contributor_id: string = ""
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
      if(!query.subordinate_id) {
        this.contributor_id = query.contributor_id;
        this.privilege = await this.privilegeService.fetchPrivilege(query.contributor_id);
        this.fetchingPrivilege = false;
      } else {
        this.contributor_id = query.subordinate_id;
        this.privilege = await this.privilegeService.fetchPrivilege(query.subordinate_id);
        this.fetchingPrivilege = false;
      }
    })
  }
 
  async updatePrivilege(ev: any) {
    this.updatingPrivilege = true;
    await this.privilegeService.changePrivilege(this.contributor_id, this.privilege).then(async result => {
      this.updatingPrivilege = false;
      await this.init();
    })

  }

}
