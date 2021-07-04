import {Component, OnInit} from '@angular/core';
import {LocalStorage} from "../../../service/LocalStorage";
import {ApiServiceService} from "../../../service/api-service.service";
import {LoginDto} from "../../model/LoginDto";
import {Router} from '@angular/router';
import {NotificationService} from "../../../service/notification.service";
import {LoginResponse} from "../../model/LoginResponse";
import {LocationResponse} from "../../model/LocationResponse";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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
    }
  }

  login(phone: string, password: string) {
    let login = new LoginDto();
    login.phone = phone;
    login.password = password;
    this.service.loginRequest(login).subscribe(value => {
      if (value == null) {
        return;
      }
      if (value.statusCode === 200 || value.statusCode < 400) {
        /**
         * Now save data in local database
         */
        this.saveCredentialsInLocal(value);
        this.notification.showSuccess("SignIn", value.message)
        return
      }
      this.notification.showInfo("", value.message);
    })
  }

  async saveCredentialsInLocal(response: LoginResponse) {
    try {

      this.localStorage.saveCredentials(response, response.message)
      this.router.navigateByUrl("/")
      window.location.reload()
    } catch (e) {
      this.notification.showError("Database", "" + e.message())
    }
  }
}
