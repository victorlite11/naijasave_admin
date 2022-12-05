import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubordinatesRequest } from 'src/app/shared/interface/shared-interface';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import { SubordinatesService } from 'src/app/shared/services/subordinates/subordinates.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.scss']
})
export class ContributorsComponent implements OnInit {

  // fetch subordinates
  fetchingContributors = true;
  contributors: ContributorModel[] = [];

  addButtonText: string = "";
  title: string = "Subordinates";
  name = `Total ${this.title}`;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private contributorsService: ContributorsService) { } 

   ngOnInit(): void {
    this.init();
  }
  
  async init() {
    this.route.queryParams.subscribe(async query => {
  
      // construct add button text
      switch (query.identity) {
        case "contributors":
          this.addButtonText = "Add New Contributor";
          this.title = "Contributors";
          this.name = `Total ${this.title}`;
          break;
        case "investors":
          this.addButtonText = "Add New Investor"
          this.title = "Investors";
          this.name = `Total ${this.title}`;
          break;
        case "super-contributors":
          this.addButtonText = "Add New Contributor"
          this.title = "Super Contributors";
          this.name = `Total ${this.title}`;
          break;
        default:
          this.title = "Sub Contributors"
          this.addButtonText = "Add New Contributor"
          this.name = `Total ${this.title}`;
          break;
      }
      
      this.fetchingContributors = true;
      await this.contributorsService.fetchSpecificContributors({
        identity: query.identity
      }).then( result => {
        this.fetchingContributors = false;
        this.contributors = result as ContributorModel[];
      })
    })
  }

  ngAfterViewInit() {
  }

  createContributor() {
    this.route.queryParams.subscribe( query => {
      this.router.navigate(['new-contributor'], {relativeTo: this.route.parent, queryParams: {identity: query.identity as string}});
    })
  }

}
