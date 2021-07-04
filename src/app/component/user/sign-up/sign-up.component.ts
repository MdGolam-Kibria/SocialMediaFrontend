import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "../../../service/api-service.service";
import {Router} from "@angular/router";
import {SignUpDto} from "../../model/SignUpDto";
import {NotificationService} from "../../../service/notification.service";
import {LoginResponse} from "../../model/LoginResponse";
import {LocalStorage} from "../../../service/LocalStorage";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  loginResponse: LoginResponse | null;

  constructor(
    private localStorage: LocalStorage,
    private service: ApiServiceService,
    private notification: NotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginResponse = this.localStorage.getCredentials();
    if (this.loginResponse != null) {
      this.router.navigateByUrl("/");
      window.location.reload()
    }
  }


  signUpRequest(userName: string, phone: string, email: string, password: string) {
    let signUpObject = new SignUpDto();
    signUpObject.username = userName;
    signUpObject.phone = phone;
    signUpObject.email = email;
    signUpObject.password = password;


    this.service.signUpRequest(signUpObject).subscribe(value => {
      if (value == null) {
        this.notification.showError("SignUp", "Something Wrong")
        return;
      }
      if (value.statusCode === 200 || value.statusCode < 400) {
        this.notification.showSuccess("", value.message);
        this.router.navigateByUrl("/signIn")
        return
      }
      this.notification.showInfo("SignUp", value.message);
    })


  }
}
