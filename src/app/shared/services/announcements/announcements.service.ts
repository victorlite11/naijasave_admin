import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AnnouncementModel, AnnouncementsCountResponse, Category } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private announcementsEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('ANNOUNCEMENTS_ENDPOINT') announcementsEndpoint: string
  ) {
    this.announcementsEndpoint = announcementsEndpoint;
   }

  async fetchAnnouncements(categories: Category): Promise<AnnouncementModel[]> {
    return await this.http.post(this.announcementsEndpoint + `/fetch-announcements`, categories).toPromise().then(r => {
      return r as AnnouncementModel[];
    })
  }

  async countAnnouncements(categories: Category): Promise<AnnouncementsCountResponse> {
    return await this.http.post(this.announcementsEndpoint + `/fetch-announcements?count=${true}`, categories).toPromise().then(r => {
      return r as AnnouncementsCountResponse;
    })
  }

  async fetchAnnouncement(id: string): Promise<AnnouncementModel> {
    return await this.http.get(this.announcementsEndpoint + `/fetch-announcement?id=${id}`).toPromise().then(r => {
      return r as AnnouncementModel;
    })
  }


  async createAnnouncement(announcement: AnnouncementModel): Promise<boolean> {
    return await this.http.post(this.announcementsEndpoint + "/new-announcement", announcement).toPromise().then(r => {
      return true;
    }).catch(e => {
      return false;
    })
  }

  async updateAnnouncement(announcement: AnnouncementModel): Promise<boolean> {
    return await this.http.post(this.announcementsEndpoint + "/update-announcement", announcement).toPromise().then(r => {
      return true;
    }).catch(e => {
      return false;
    })
  }

  async deleteAnnouncement(id: string): Promise<boolean> {
    return await this.http.delete(this.announcementsEndpoint + `/delete-announcement?id=${id}`).toPromise().then(r => {
      return true;
    }).catch(e => {
      return false;
    })
  }
}
