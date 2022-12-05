import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private http: HttpClient,
    @Inject('GENERAL_ENDPOINT') private generalEndpoint: string
  ) { 

  }

}
