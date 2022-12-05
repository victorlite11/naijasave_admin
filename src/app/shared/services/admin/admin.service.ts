import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { AdminModel } from '../../models/admin-model/admin-model';
import { NewAdminModel } from '../../models/new-admin-model/new-admin-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private endpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('ADMINS_ENDPOINT') endpoint: string
  ) { 
    this.endpoint = endpoint;
  }

  async getAdmin(admin_id: string): Promise<AdminModel> {
    return await this.http.get(this.endpoint + `/${admin_id}`).toPromise().then(result => {
      return result as AdminModel;
    })
  }

  async getAdmins(): Promise<AdminModel[]> {
    return await this.http.get(this.endpoint).toPromise().then(result => {
      return result as AdminModel[];
    })
  }

  async createNewAdmin(payload: NewAdminModel): Promise<OperationFeedback> {
    return await this.http.post(this.endpoint + "/new-admin", payload).toPromise().then(response => {
      return response as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message};
    })
  }
}
