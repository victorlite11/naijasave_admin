import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from "@angular/common";
import { SearchSelection } from '../../interface/shared-interface';

@Component({
  selector: 'app-subordinate-card',
  templateUrl: './subordinate-card.component.html',
  styleUrls: ['./subordinate-card.component.scss']
})
export class SubordinateCardComponent implements OnInit {
  @Input() name?: string;
  @Input() phoneNumber?: string;
  @Input() subordinate_id?: string;
  @Input() status?: string;
  @Input() destination : "profile" | "conversation" | "interaccount" | "subordinate" = "profile";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject('SEARCH_SELECTION_KEY') private searchSelectionKey : string,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  navigateToSubordinateDashboard() {
    if(!this.subordinate_id) {
      return;
    }

    switch(this.destination) {
      case "conversation":
        this.router.navigate(['chats'],{relativeTo: this.route.parent, queryParams: {for: this.subordinate_id as string}});
        break;
      case "interaccount":
        sessionStorage.setItem(this.searchSelectionKey, JSON.stringify( <SearchSelection> {
          name : this.name,
          phoneNumber : this.phoneNumber,
          contributorId: this.subordinate_id
        }))
        this.location.back();
        break;
      case "subordinate":
        this.router.navigate(['subordinate'],{relativeTo: this.route.parent, queryParams: {subordinate_id: this.subordinate_id as string}});
        break;
      default:
        this.router.navigate(['contributor'],{relativeTo: this.route.parent, queryParams: {contributor_id: this.subordinate_id as string}})
    }
  }

}
