import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback, SMSProforma } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(
    private http: HttpClient,
    @Inject('SMS_ENDPOINT') private smsEndpoint: string
  ) { }

  async getSMSProforma(
    for_: "account-change" | "debits" | "credits" | "signups" | "deposit-requests" | "withdrawal-requests" 
  ): Promise<SMSProforma> {
    return await this.http.get(this.smsEndpoint + `/proformas?for=${for_}`).toPromise().then(resp => {
      return resp as SMSProforma;
    });
  }

  async updateSMSProforma(proforma: SMSProforma): Promise<OperationFeedback> {
    return this.http.put(this.smsEndpoint + '/proformas', proforma).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
  }

  async createSMSProforma(proforma: SMSProforma): Promise<OperationFeedback> {
    return this.http.post(this.smsEndpoint + '/proformas', proforma).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
    
  }

  async getAllSMSProforma(): Promise<SMSProforma[]> {
    return await this.http.get(this.smsEndpoint + `/all-proformas`).toPromise().then(resp => {
      return resp as SMSProforma[];
    });
  }
}
