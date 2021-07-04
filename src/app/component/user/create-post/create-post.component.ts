import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiServiceService} from "../../../service/api-service.service";
import {LocationSearchResponse} from "../../model/LocationSearchResponse";
import {NotificationService} from "../../../service/notification.service";
import {PostDto} from "../../model/PostDto";
import {LocationResponse} from "../../model/LocationResponse";
import {Router} from "@angular/router";
import {LoginResponse} from "../../model/LoginResponse";
import {LocalStorage} from "../../../service/LocalStorage";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  loginResponse: LoginResponse | null;
  @ViewChild('myInput') searchField: ElementRef;
  locationSearchResponse: LocationSearchResponse;
  selectedLocation: string;
  radioData: any;

  constructor(
    private service: ApiServiceService,
    private notification: NotificationService,
    private route: Router,
    private localStorage: LocalStorage
  ) {
  }

  ngOnInit(): void {
    this.loginResponse = this.localStorage.getCredentials();
    if (this.loginResponse == null) {
      this.route.navigateByUrl("/");
      return
    }
  }

  getLocationListByKey(key: string) {
    if (key === '') {
      this.locationSearchResponse = new LocationSearchResponse();
      return
    }
    this.service.getLocationByKey(key).subscribe(value => {
      this.locationSearchResponse = value;
    })
  }

  selectLocation(location: string, id: number) {
    this.notification.showInfo("", location)
    this.selectedLocation = location;
    this.locationSearchResponse = new LocationSearchResponse();
    this.searchField.nativeElement.innerHTML.setValue("nxfbg");
  }

  submit(currentStatus: string) {
    if (currentStatus === '') {
      this.notification.showInfo("", "Status is empty");
      return
    }
    if (this.radioData == null) {
      this.notification.showInfo("", "Choose privacy")
      return;
    }
    if (this.selectedLocation === '') {
      this.notification.showInfo("", "select location");
      return;
    }


    let postObject = new PostDto();
    postObject.post = currentStatus;

    let locationObject = new LocationResponse();
    locationObject.location = this.selectedLocation;

    postObject.location = locationObject;
    postObject.isPublic = this.radioData == "1" ? true : false;

    this.notification.showInfo("", "" + postObject.location.location)

    this.service.submitPost(postObject).subscribe(value => {
      if (value == null) {
        this.notification.showError("", "Something wrong")
        return
      }
      if (value.statusCode == 200 || value.statusCode < 400) {
        this.notification.showSuccess("", value.message);
        this.route.navigateByUrl("/")
        return;
      }
      this.notification.showError("", value.message);
    })

  }
}
