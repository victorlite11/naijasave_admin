import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicContributorModel, ReferralData } from 'src/app/shared/interface/shared-interface';
import { ReferralService } from 'src/app/shared/services/referral/referral.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  fetchingReferrals = true;
  title = "Referral";
  balance = 0;
  referred: BasicContributorModel[] = [];
  referralData: ReferralData = new ReferralData();
  invitationLink: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private referralService: ReferralService,
    private location: Location,
    @Inject('INVITATION_LINK') invitationLink: string
  ) { 
    this.invitationLink = invitationLink;
  }

  ngOnInit(): void {
    this.fetchingReferrals = true;
    this.route.queryParams.subscribe(async query => {
      if(!query.subordinate_id) {
        this.referralData = await this.referralService.getReferralData(query.contributor_id);
        this.invitationLink += this.referralData.code;
        this.fetchingReferrals = false;
      } else {
        this.referralData = await this.referralService.getReferralData(query.subordinate_id);
        this.invitationLink += this.referralData.code;
        this.fetchingReferrals = false;
      }
    })
  }

  moveBack() {
    this.location.back();
  }

  init(): void {
    this.fetchingReferrals = true;
  }

}
