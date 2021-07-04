import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "../../../service/api-service.service";
import {PostResponse} from "../../model/PostResponse";
import {LocalStorage} from "../../../service/LocalStorage";
import {plainToClass} from "class-transformer";
import {LoginResponse} from "../../model/LoginResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {registerOutsideClick} from "ngx-bootstrap/utils";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  allPostResponse: PostResponse;
  loginResponse: LoginResponse | null;

  constructor(
    private service: ApiServiceService,
    private local: LocalStorage,
    private router: Router,
    private activeRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loginResponse = this.local.getCredentials();
    if (this.loginResponse == null) {
      this.router.navigateByUrl("/signIn");
    }

    this.service.getAllPost().subscribe(value => {
      this.allPostResponse = value
    })

  }

}
