import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { SignupRequestModel } from '../../models/signup-request-model/signup-request-model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('SIGNUP_REQUEST_ENDPOINT') signupRequestEndpoint: string
  ) {
    this.signupEndpoint = signupRequestEndpoint;
  }

  async sendSignupRequest(request: SignupRequestModel): Promise<{success: boolean, msg: string}> {
    return await this.http.post(this.signupEndpoint, request).toPromise().then(r => {
      return {success: true, msg: "Contributor Created Successfully"}
    }).catch((e: HttpErrorResponse )=> {
      return {success: false, msg: e.error.message}
    });
  }

  async fetchSignupRequests(): Promise<SignupRequestModel[]> {
    return await this.http.get(this.signupEndpoint).toPromise().then(r => {
      return r as SignupRequestModel[];
    })
  }

  async fetchSignupRequest(id: string): Promise<SignupRequestModel> {
    return await this.http.get(this.signupEndpoint + `?id=${id}`).toPromise().then(r => {
      return r as SignupRequestModel;
    })
  }

  async removeSignupRequest(admin_id: string ,id: string): Promise<OperationFeedback> {
    return await this.http.delete(this.signupEndpoint + `?admin_id=${admin_id}&id=${id}`).toPromise().then(r => {
      return  {success: true, message: "Signup Request Removed"};
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message};
    })
  }

    async updateSignupRequests(admin_id: string, id: string, updated: SignupRequestModel, update: boolean): Promise<OperationFeedback> {
    
      return await this.http.put(this.signupEndpoint + `?admin_id=${admin_id}&id=${id}&update=${update}`, updated).toPromise().then(r => {
        if(update) {
          return {success: true, message: "Updated successfully"};
        } else {
          return {success: true, message: "Created successfully"};
        }
      }).catch((e: HttpErrorResponse) => {
        return {success: false, message: e.error.message};
      })
  }
}
