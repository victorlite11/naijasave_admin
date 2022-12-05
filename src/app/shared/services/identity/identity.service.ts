import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { AdminIdentityModel } from '../../models/admin-model/admin-model';
import { IdentityModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private endpoint: string
  constructor(
    private http: HttpClient,
    @Inject('IDENTITY_ENDPOINT') endpoint: string
  ) { 
    this.endpoint = endpoint;
  }

  async fetchIdentity(contributor_id: string): Promise<IdentityModel> {
    return this.http.get(this.endpoint + `/contributor_identity?contributor_id=${contributor_id}`).toPromise().then(result => {
      return result as IdentityModel;
    })
  }

  async fetchAdminIdentity(admin_id: string): Promise<AdminIdentityModel> {
    return this.http.get(this.endpoint + `/admin_identity?admin_id=${admin_id}`).toPromise().then(result => {
      return result as AdminIdentityModel;
    });
  }

  async changeContributorIdentity(
    contributor_id: string,
    interested_identity: {interested_identity: "super" | "sub" | "investor" | "contributor"}): Promise<OperationFeedback> {
      return this.http.post(this.endpoint + `/change_contributor_identity?contributor_id=${contributor_id}`, interested_identity).toPromise().then(result => {
        return result as OperationFeedback;
      });
    }
  
  async changeAdminIdentity(
    admin_id: string,
    interested_identity: {interested_identity: "super" | "sub" | "head"}): Promise<OperationFeedback> {
      return this.http.post(this.endpoint + `/change_admin_identity?admin_id=${admin_id}`, interested_identity).toPromise().then(result => {
        return result as OperationFeedback;
      });
    }
}
