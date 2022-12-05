import { Inject, Injectable } from '@angular/core';
import { ContributorModel, PaymentTicksModel } from '../../models/contributor-model/contributor-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BasicContributorOverseerModel, ContributorsCountResponse, ContributorsFetchRequest, OperationFeedback, SMSProforma } from '../../interface/shared-interface';


export enum ACCOUNT_TYPE {
  ADMIN, NORMAL_CONTRIBUTOR, INVESTOR
}


@Injectable({
  providedIn: 'root'
})
export class ContributorsService {
  private nodeValue = "contributors";
  private contributorsEndpoint: string;
  constructor(
    private http: HttpClient,
    @Inject('CONTRIBUTORS_ENDPOINT') contributorsEndpoint: string
  ) {
    this.contributorsEndpoint = contributorsEndpoint;
   }


  async getContributor(id: string): Promise<ContributorModel> {
    return await this.http.get(this.contributorsEndpoint + `/contributors/${id}`).toPromise().then(response => {
      return response as ContributorModel;
    });
  }

  async countContributors(): Promise<ContributorsCountResponse> {
    return await this.http.get(this.contributorsEndpoint + "/contributors?count=true").toPromise().then(response => {
      return response as ContributorsCountResponse;
    });
  }

  async createNewContributor(request_id: string): Promise<OperationFeedback> {
    return await this.http.post(this.contributorsEndpoint + `/contributors/new-contributor?id=${request_id}`,{}).toPromise().then(response => {
      return {success: true, message: "Contributor Created Successfully!"};
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message}
    })
  }

  async fetchSpecificContributors(payload: ContributorsFetchRequest): Promise<ContributorModel[]> {
    return await this.http.get(this.contributorsEndpoint + `/contributors?identity=${payload.identity}`).toPromise().then(response => {
      return response as ContributorModel[];
    });
  }

  async changeUsername(payload: {id: string, username: string, sms?: SMSProforma}): Promise<boolean> {
    return await this.http.put(this.contributorsEndpoint + "/contributors/change-username", payload).toPromise().then(r => {
        return true;
    }).catch(e => {
      return false;
    })
  }

  async changeOverseer(payload: {admin_id: string, contributor_id: string, new_overseer_id: string}): Promise<OperationFeedback> {
    return await this.http.put(this.contributorsEndpoint + "/contributors/change-overseer", payload).toPromise().then(r => {
        return r as OperationFeedback;
    }).catch((e: HttpErrorResponse) => {
      return {success: false, message: e.error.message};
    })
  }

  async getContributorOverseer(contributor_id: string): Promise<BasicContributorOverseerModel> {
    return await this.http.post(this.contributorsEndpoint + `/contributors/fetch-overseer`, {contributor_id: contributor_id}).toPromise().then(resp => {
      return resp as BasicContributorOverseerModel;
    });
  }

  async deleteContributor(admin_id: string, contributor_id: string): Promise<OperationFeedback> {
    return await this.http.delete(this.contributorsEndpoint + 
      `/contributors/${contributor_id}?admin_id=${admin_id}`).toPromise().then(r => {
        return {success: true, message: "Contributor deleted successfully"};
      }).catch((e: HttpErrorResponse) => {
        return {success: false, message: e.error.message};
      })
  }

 
}
