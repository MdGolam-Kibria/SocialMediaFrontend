import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "../../../service/LocalStorage";
import {ApiServiceService} from "../../../service/api-service.service";
import {LoginDto} from "../../model/LoginDto";
import {Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";
import {LoginResponse} from "../../model/LoginResponse";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private localStorage: LocalStorage,
    private service: ApiServiceService,
    private notification: NotificationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  login(phone: string, password: string) {
    let login = new LoginDto();
    login.phone = phone;
    login.password = password;
    this.service.loginRequest(login).subscribe(value => {
      if (value == null) {
        /**
         * Now save data in local database
         */
        this.saveCredentialsInLocal(value);
        return;
      }
      if (value.statusCode === 200 || value.statusCode < 400) {
        this.notification.showSuccess("SignIn", value.message)
        return
      }
      this.notification.showInfo("", value.message);
    })
  }

  async saveCredentialsInLocal(response: LoginResponse) {
    try {
      this.localStorage.saveCredentials(String(response))
      this.notification.showError("SignUp", "Something Wrong")
    } catch (e) {
      this.notification.showError("Database", "" + e.message())
    }
  }
}
