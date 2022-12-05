import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';
import Swal from 'sweetalert2';
import { Location } from "@angular/common";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title = "Settings";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contributorsService: ContributorsService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
      this.init();
  }

  init(): void {
  }

  deleteContributor() {
    this.route.queryParams.subscribe(async query => {
      this.route.data.subscribe(async data => {
        this.contributorsService.deleteContributor(data.admin_id, query.contributor_id).then(r => {
          if(r.success) {
            this.location.back();
            this.router.navigate(['contributors-portal'], {relativeTo: this.route.parent, skipLocationChange: true});
          } else {
            Swal.fire({
              title: "Not Successful",
              text: r.message,
              icon: "error",
              width: "20em",
              position: "center"
            });
          }
        })
      })
    });
  }

}
