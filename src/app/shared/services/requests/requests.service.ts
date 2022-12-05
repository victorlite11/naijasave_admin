import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RequestsCountResponse } from '../../interface/shared-interface';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient,
    @Inject('REQUEST_ENDPOINT') private endpoint: string
  ) { }

  async countRequests(overseer_id?: string): Promise<RequestsCountResponse> {
    if(overseer_id) {
      return await this.http.get(this.endpoint + `/count-requests?overseer_id=${overseer_id}`).toPromise().then(response => {
        return response as RequestsCountResponse;
      });
    }
    return await this.http.get(this.endpoint + "/count-requests").toPromise().then(response => {
      return response as RequestsCountResponse;
    });
  }
}
