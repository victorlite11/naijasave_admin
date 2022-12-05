import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IAuthCredential } from 'src/app/shared/interface/shared-interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  count = "Welcome"
  title = "NaijaSave"
  sub_text = "Please Sign in"
  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
    remember: new FormControl(false)
  })
  signingin = false;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  async submit() {
    this.signingin = true;
    let credentials: IAuthCredential = {
      login: this.form.value.phoneNumber,
      password: this.form.value.password,
      remember: this.form.value.remember ? "true" : "false"
    }

    await this.authService.authenticate(credentials).then( response => {
      if(response.authenticated) {
        this.router.navigate([''],{ replaceUrl: true });
      } else {
        this.signingin = false;
        
        this.feedback = response.reason as string;
        this.type = "error";

        setTimeout(() => {
          this.feedback = ""
        }, 5100)
      }
    });

  }

  moveBack() {
    this.location.back();
  }

  navigated = false;
  ngOnInit(): void {
  
  this.navigated = this.router.navigated ? true : false;

  }

}
