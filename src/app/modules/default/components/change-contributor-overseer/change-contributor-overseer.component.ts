import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-contributor-overseer',
  templateUrl: './change-contributor-overseer.component.html',
  styleUrls: ['./change-contributor-overseer.component.scss']
})
export class ChangeContributorOverseerComponent implements OnInit {
  title = "Change Overseer";
  name = "Current Overseer";
  sub_text = "Click the cards to change overseer";
  admins: AdminModel[] = [];
  contributors: ContributorModel[] = [];
  contributor = new ContributorModel();
  updatingOverseer = false;
  fetchingOverseers = true;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";
  constructor(
    private adminService: AdminService,
    private contributorsService: ContributorsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.init();
    this.fetchContributor();
  }

  async init() {
    this.fetchingOverseers = true;
    this.admins = await this.adminService.getAdmins();
    this.route.queryParams.subscribe(async query => {
      await this.contributors.push(
        ...((await this.contributorsService.fetchSpecificContributors({identity: "super-contributors"})).filter(c => c._id !== query.contributor_id)),
        ...((await this.contributorsService.fetchSpecificContributors({identity: "sub-contributors"})).filter(c => c._id !== query.contributor_id))
      );
    });
    this.fetchingOverseers = false;

  }

  async fetchContributor() {
    this.route.queryParams.subscribe(async query => {
      this.contributor = await this.contributorsService.getContributor(query.contributor_id);
    })
  }

  async updateOverseer(id: string) {
    this.updatingOverseer = true;
    this.route.queryParams.subscribe(async query => {
      this.route.data.subscribe(async data => {
        await this.contributorsService.changeOverseer({admin_id: data.admin_id, contributor_id: query.contributor_id, new_overseer_id: id}).then(r => {
          this.updatingOverseer = false;

          if (r.success) {
            this.feedback = r.message;
            this.type = "success";
    
            this.fetchContributor();
          } else {
            this.feedback = r.message;
            this.type = "error";
          }
    
          setTimeout(() => {
            this.feedback = ""
          }, 5100)
        })
      })
    })
  }

}
