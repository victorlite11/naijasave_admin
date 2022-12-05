import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { Destination } from 'src/app/shared/interface/shared-interface';

@Component({
  selector: 'app-search-portal',
  templateUrl: './search-portal.component.html',
  styleUrls: ['./search-portal.component.scss']
})
export class SearchPortalComponent implements OnInit {
  title = "Search Contributors"
  destination : Destination = {destination : "profile"}
  form: FormGroup = new FormGroup({
    interest: new FormControl("name", Validators.required)
  })

  searchKeywords = "";
  searching = false;
  searchResult: ContributorModel[] = [];
  authKeyName: string;
  constructor(
    private location: Location,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('AUTH_KEY_PROPERTY_NAME') authKeyName: string
  ) {
    this.authKeyName = authKeyName;
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async data => {
      this.destination = {destination : data.destination || "profile"};
    })
  }

  moveBack() {
    this.location.back();
  }

  signOut() {
    sessionStorage.removeItem(this.authKeyName);
    localStorage.removeItem(this.authKeyName);
    this.router.navigateByUrl("/home");
  }

  async search() {
    this.searching = true;
    this.route.data.subscribe(async data => {
      await this.searchService.searchContributors(
        {
          overseer_id: data.admin_id,
          use: this.form.value.interest,
          search_keywords: this.searchKeywords
        }
      ).then(result => {
        this.searchResult = result;
        this.searching = false;
      });
    })
  }

}
