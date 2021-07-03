import {Component} from '@angular/core';
import {LocalStorage} from "./service/LocalStorage";
import {NotificationService} from "./service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled';


  constructor(private local: LocalStorage, private notification: NotificationService, private router: Router) {
  }

  signOut() {
    if (confirm("Do you want to exit ?")) {
      try {
        this.local.deleteCredentials();
        this.notification.showSuccess("SignOut", "Logout Successfully")
        this.router.navigateByUrl('/')
      } catch (e) {
        this.notification.showError("Database", "Something Wrong")
      }
    }
  }
}
