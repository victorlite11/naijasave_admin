import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementModel, Category } from 'src/app/shared/interface/shared-interface';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { AnnouncementsService } from 'src/app/shared/services/announcements/announcements.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {  
  // announcements
  fetchingAnnouncements = true;
  announcements: AnnouncementModel[] = [];
  title = "Notifications";
  name = "Total Notifications"
  admin = new AdminModel();
  constructor(
    private announcementsService: AnnouncementsService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.fetchAdmin();
      this.init();
    }
  
  private async fetchAdmin() {
    this.route.data.subscribe(async data => {
      this.admin = await this.adminService.getAdmin(data.admin_id);
    });
  }

  private async init() {
    this.fetchingAnnouncements = true;
    this.route.data.subscribe(async data => {
      let categories:  Category;
      if(this.admin.identity?.isHeadAdmin) {
        categories = {
          admins: true, 
          general: true,
          superContributors: true,
          subContributors: true,
          contributors: true,
          investors: true
        }
      } else {
        categories = {general: true, admins: true}
      }
      await this.announcementsService.fetchAnnouncements(categories).then(announcements => {
        this.fetchingAnnouncements = false;
        announcements.forEach(a => {
          a.date = new Date(a.date as string).toDateString();
        });
        this.announcements = announcements;
      })
    })
  }

  createNewAnnouncement() {
    this.router.navigate(['create-announcement'], {relativeTo: this.route.parent});
  }

  async deleteAnnouncement(announcement_id: string) {
    await this.announcementsService.deleteAnnouncement(announcement_id).then(async resp => {
      await this.init();
    })
  }


}
