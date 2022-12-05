import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ChangeUsernameComponent } from 'src/app/shared/dialogs/change-username/change-username.component';
import { IdentityModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  title="Identity";
  name="Account Type";
  accountType = "Unknown";
  identity: IdentityModel = new IdentityModel()
  fetchingIdentity = true;
  updatingIdentity = false;
  contributor_id: string = "";

    // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.fetchingIdentity = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.identity = await this.identityService.fetchIdentity(query.contributor_id);
        this.fetchingIdentity = false;
        this.contributor_id = query.contributor_id;
        if(this.identity.isContributor) {
          this.accountType = "Contributor";
        } else if(this.identity.isInvestor) {
          this.accountType = "Investor";
        } else if(this.identity.isSubContributor) {
          this.accountType = "Sub Contributor";
        } else if(this.identity.isSuperContributor) {
          this.accountType = "Super Contributor";
        } else {
          this.accountType = "UNKNOWN"
        }       
      } else {
        this.identity = await this.identityService.fetchIdentity(query.subordinate_id);
          this.fetchingIdentity = false;
          this.contributor_id = query.subordinate_id;
          if(this.identity.isContributor) {
            this.accountType = "Contributor";
          } else if(this.identity.isInvestor) {
            this.accountType = "Investor";
          } else if(this.identity.isSubContributor) {
            this.accountType = "Sub Contributor";
          } else if(this.identity.isSuperContributor) {
            this.accountType = "Super Contributor";
          } else {
            this.accountType = "UNKNOWN"
          }
      }
    })
  }

  async updateIdentity(interest: "super" | "sub" | "investor" | "contributor") {
    let interested_identity = {interested_identity: interest};
    this.updatingIdentity = true;
    await this.identityService.changeContributorIdentity(this.contributor_id, interested_identity).then(async result => {
      this.updatingIdentity = false;
      // request to change username as well
      let config = new MatDialogConfig();
      config.data = {
        contributor_id: this.contributor_id
      };
      config.width = "30em";
      config.height = "30em"

      let d = this.dialog.open(ChangeUsernameComponent, config);
      d.afterClosed().subscribe(success => {
        if (success) {
          this.feedback = "Username changed successfully";
          this.type = "success";
        } else {
          this.feedback = "Unable to change username";
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })
      await this.init();
    })
  }

}
