import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContributorsCountResponse } from 'src/app/shared/interface/shared-interface';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-contributors-portal',
  templateUrl: './contributors-portal.component.html',
  styleUrls: ['./contributors-portal.component.scss']
})
export class ContributorsPortalComponent implements OnInit {
  title = "Contributors Portal";
  name = "Total Contributors";
  contributorsCount = new ContributorsCountResponse();
 
  countingContributors = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contributorsService: ContributorsService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.countingContributors = true;
    this.contributorsCount = await this.contributorsService.countContributors(); 
    this.countingContributors = false;
  }

  openSuperContributors() {
    this.navigateToSubordinates("super-contributors");
  }

  openSubContributors() {
    this.navigateToSubordinates("sub-contributors");
  }

  openContributors() {
    this.navigateToSubordinates("contributors");
  }

  openInvestors() {
    this.navigateToSubordinates("investors");
  }
 
  navigateToSubordinates(identity: "super-contributors" | "sub-contributors" | "contributors" | "investors") {
    this.router.navigate(['contributors'],{relativeTo: this.route.parent, queryParams: {identity: identity}});
  
  }

  navigateToAssignSubordinatesPortal() {
    this.route.queryParams.subscribe(async query => {
      this.router.navigate(['assign-subordinates'],{relativeTo: this.route.parent});
    })
  }

  createContributor() {
    this.router.navigate(['new-contributor'], {relativeTo: this.route.parent});
  }

  openSearchPortal() {
    this.router.navigate(['search-portal'],{relativeTo: this.route.parent});
   
  }

}
