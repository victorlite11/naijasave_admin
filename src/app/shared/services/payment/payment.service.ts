import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { OverseerCommissionSummary, PaymentModel } from '../../models/payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentEndpoint: string
  constructor(
    private http: HttpClient,
    @Inject('PAYMENT_ENDPOINT') paymentEndpoint: string
  ) { 
    this.paymentEndpoint = paymentEndpoint;
  }

  async credit(paymentData: PaymentModel): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/credit", paymentData).toPromise().then(res => {
      let x = <OperationFeedback>res;
      return {success: x.success, message: x.message as string}
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
  }

  async debit(paymentData: PaymentModel): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/debit", paymentData).toPromise().then(res => {
      let x = <OperationFeedback>res;
      return {success: x.success, message: x.message as string}
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    });
  }

  async fundAdminAccount(payload: {amount: number, admin_username: string, password: string}): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/fund-admin",payload).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }  
  
  async payOverseerCommission(payload: OverseerCommissionSummary): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/pay-overseer-commission", payload).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }

  async debitAdminAccount(payload: {amount: number, admin_username: string, password: string}): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/debit-admin",payload).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }

  async updateTradingBalance(payload: {amount: number, admin_username: string, password: string}): Promise<OperationFeedback> {
    return await this.http.post(this.paymentEndpoint + "/update-trading-balance",payload).toPromise().then(resp => {
      return resp as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }
}
