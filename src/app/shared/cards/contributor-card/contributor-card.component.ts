import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { SearchSelection } from '../../interface/shared-interface';

@Component({
  selector: 'app-contributor-card',
  templateUrl: './contributor-card.component.html',
  styleUrls: ['./contributor-card.component.scss']
})
export class ContributorCardComponent implements OnInit {
  @Input() name?: string;
  @Input() phoneNumber?: string;
  @Input() contributor_id?: string;
  @Input() status?: string;
  @Input() destination : "profile" | "conversation" | "interaccount" | "subordinate" = "profile";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject('SEARCH_SELECTION_KEY') private searchSelectionKey : string,
  ) { }

  ngOnInit(): void {
  }

  navigateToContributorDashboard() {
    if(!this.contributor_id) {
      return;
    }

    switch(this.destination) {
      case "conversation":
        this.router.navigate(['chats'],{relativeTo: this.route.parent, queryParams: {for: this.contributor_id as string}});
        break;
      case "interaccount":
        sessionStorage.setItem(this.searchSelectionKey, JSON.stringify( <SearchSelection> {
          name : this.name,
          phoneNumber : this.phoneNumber,
          contributorId: this.contributor_id
        }))
        this.location.back();
        break;
      case "subordinate":
        this.router.navigate(['subordinate'],{relativeTo: this.route.parent, queryParams: {subordinate_id: this.contributor_id as string}});
        break;
      default:
        this.router.navigate(['contributor'],{relativeTo: this.route.parent, queryParams: {contributor_id: this.contributor_id as string}})
    }
  }

}
