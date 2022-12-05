import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { AdminPrivilegeModel } from '../../models/admin-model/admin-model';
import { PrivilegeModel } from '../../models/contributor-model/contributor-model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private endpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('PRIVILEGE_ENDPOINT') endpoint: string
  ) { 
    this.endpoint = endpoint;
  }

  async fetchPrivilege(contributor_id: string): Promise<PrivilegeModel> {
    return this.http.get(this.endpoint + `/contributor_privilege?contributor_id=${contributor_id}`).toPromise().then(result => {
      return result as PrivilegeModel;
    })
  }

  async fetchAdminPrivilege(admin_id: string): Promise<AdminPrivilegeModel> {
    return this.http.get(this.endpoint + `/admin_privilege?admin_id=${admin_id}`).toPromise().then(result => {
      return result as AdminPrivilegeModel;
    })
  }

  async changePrivilege(contributor_id: string, modified_privilege_object: PrivilegeModel): Promise<OperationFeedback> {
    
    return this.http.post(this.endpoint + `/change_contributor_privilege?contributor_id=${contributor_id}`, modified_privilege_object).toPromise().then(result => {
      return result as OperationFeedback;
    });

  }

  async changeAdminPrivilege(admin_id: string, modified_privilege_object: AdminPrivilegeModel): Promise<OperationFeedback> {
    
    return this.http.post(this.endpoint + `/change_admin_privilege?admin_id=${admin_id}`, modified_privilege_object).toPromise().then(result => {
      return result as OperationFeedback;
    });

  }

}
