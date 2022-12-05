import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationFeedback } from '../../interface/shared-interface';
import { CompanyModel, CompanySettingsModel } from '../../models/company-model/company-model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient,
    @Inject('COMPANY_ENDPOINT') private endpoint: string
  ) { }

  async getCompanyData(): Promise<CompanyModel> {
    return await this.http.post(this.endpoint, {password: "bbC"}).toPromise().then(data => {
      return data as CompanyModel;
    })
  }

  async computeCommission(): Promise<boolean> {
    return await this.http.get(this.endpoint + "/compute-commission").toPromise().then(data => {
      return data as boolean;
    })
  }

  async updateCompanySettings(modified_settings: CompanySettingsModel): Promise<OperationFeedback> {
    return await this.http.put(this.endpoint + "/change_company_settings", modified_settings).toPromise().then(r => {
      return r as OperationFeedback;
    })
  }
}
