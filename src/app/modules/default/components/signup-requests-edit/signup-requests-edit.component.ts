import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupRequestModel } from 'src/app/shared/models/signup-request-model/signup-request-model';
import { SignupService } from 'src/app/shared/services/signup/signup.service';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-requests-edit',
  templateUrl: './signup-requests-edit.component.html',
  styleUrls: ['./signup-requests-edit.component.scss']
})
export class SignupRequestsEditComponent implements OnInit {

  signupRequest = new SignupRequestModel();
  adding = false;
  count = "Update Signup Request";
  title = "NaijaSave"
  fetchingRequest = true;

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";


  constructor(
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
    ) {}
    
  ngOnInit(): void {
    this.fetchingRequest = true;
    this.route.queryParams.subscribe(async query => {
      this.signupRequest = await this.signupService.fetchSignupRequest(query.request_id);
      this.fetchingRequest = false;
    })
  }
 
  async create() {
    this.adding = true;
    this.route.data.subscribe(async data => {
      await this.signupService.updateSignupRequests(data.admin_id,this.signupRequest._id!!, this.signupRequest, false).then(r => {
        this.adding = false;
        if (r.success) {
          this.feedback = r.message;
          this.type = "success";
          this.location.back()
        } else {
          this.feedback = r.message;
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })
    })
  }

  async update() {
    this.adding = true;
    this.route.data.subscribe(async data => {
      await this.signupService.updateSignupRequests(data.admin_id, this.signupRequest._id!!, this.signupRequest, true).then(r => {
        this.adding = false;
        if (r.success) {
          this.feedback = r.message;
          this.type = "success";
          this.location.back()
        } else {
          this.feedback = r.message;
          this.type = "error";
        }
  
        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      })
    })
  }
}
