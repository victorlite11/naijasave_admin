import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnouncementModel, Category } from 'src/app/shared/interface/shared-interface';
import { AnnouncementsService } from 'src/app/shared/services/announcements/announcements.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  title = "Create Notification";
  btnText = "Create";
  announcement?: AnnouncementModel;
  announcing = false;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  announcementForm: FormGroup = new FormGroup({
    title: new FormControl(""),
    body: new FormControl("", [Validators.required, Validators.minLength(10)]),
  });
  category = new Category();

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private announcementService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(async query => {
      if(query.announcement_id) {
        let announcement = await this.announcementService.fetchAnnouncement(query.announcement_id);
        this.announcement = announcement;
        this.title = "Edit Notification";
        this.announcementForm.setValue({
          title: announcement.title,
          body: announcement.body
        });
        this.category = announcement.category;
        this.btnText = "Update";
      }
    });
  }

  announce() {
    // define category
    let announcement = this.announcement || new AnnouncementModel();
    announcement.body = this.announcementForm.value.body;
    announcement.title = this.announcementForm.value.title;
    announcement.category = this.category;
    this.announcing = true;
    this.route.queryParams.subscribe(async query => {
      if(query.announcement_id) {
        await this.updateAnnouncement(announcement);
        this.announcing = false;
      } else {
        await this.createNewAnnouncement(announcement);
        this.announcing = false;
      }
    })
  }

  async createNewAnnouncement(announcement: AnnouncementModel) {
    await this.announcementService.createAnnouncement(announcement).then(successful => {
      if (successful) {
        this.feedback = "Notification created successfully";
        this.type = "success";
        this.location.back();
      } else {
        this.feedback = "Could not create notification";
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

  async updateAnnouncement(announcement: AnnouncementModel) {
    await this.announcementService.updateAnnouncement(announcement).then(successful => {
      if (successful) {
        this.feedback = "Notification updated successfully";
        this.type = "success";
        this.location.back();
      } else {
        this.feedback = "Could not create notification";
        this.type = "error";
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)
    })
  }

}
