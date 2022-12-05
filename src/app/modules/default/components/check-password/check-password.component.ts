import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from 'src/app/shared/services/password/password.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent implements OnInit {
  title = "Check Password"
  gettingPassword = false

  // for error alert
  feedback = "";
  type : "error" | "success" = "success";

  form: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    cap: new FormControl('', [Validators.required]) // Company Authorization Key (cap)
  })

  password = ""
  passwordReceived = false;
  
  constructor(
    private passwordService : PasswordService
  ) { }

  ngOnInit(): void {
  }

  async submit() {
    this.gettingPassword = true;
    await this.passwordService.checkPassword({
      phoneNumber: this.form.value.phoneNumber,
      cap: this.form.value.cap
    }).then(r => {
      this.gettingPassword = false;
      if (r.success) {
        this.feedback = "Password retrieved"
        this.type = "success";
        this.password = r.data!!;
        this.passwordReceived = true;
      } else {
        this.feedback = r.message;
        this.type = "error";
        this.passwordReceived = false;
      }

      setTimeout(() => {
        this.feedback = ""
      }, 5100)

    })

  }

}
