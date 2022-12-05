import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(
    private http : HttpClient,
    @Inject("PASSWORD_RESET_ENDPOINT") private passwordResetEndpoint : string
  ) { }

  async checkPassword(payload: {
    phoneNumber: string,
    cap: string
  }): Promise<OperationFeedback> {
    return this.http.post(`${this.passwordResetEndpoint}/get-password`, payload).toPromise().then( r => {
      return r as OperationFeedback
    }).catch( (e : HttpErrorResponse) => {
      return {
        success: false,
        message: e.error.message
      }
    })
  }
}
