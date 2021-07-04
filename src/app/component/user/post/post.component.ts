import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "../../../service/api-service.service";
import {PostResponse} from "../../model/PostResponse";
import {LocalStorage} from "../../../service/LocalStorage";
import {LoginResponse} from "../../model/LoginResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../service/notification.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  allPostResponse: PostResponse;
  loginResponse: LoginResponse | null;
  selectedOption: string;
  havePermission: boolean = true;

  constructor(
    private service: ApiServiceService,
    private local: LocalStorage,
    private router: Router,
    private notification: NotificationService,
    private activeRoute: ActivatedRoute) {
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

  selectedOptions(postId: number) {
    // 0 means delete 1 means edit
    debugger
    if (this.selectedOption == null) {
      this.notification.showInfo("", "null")
      return;
    }

    if (this.selectedOption == "1") {
      this.router.navigateByUrl("/editPost")
      return
    }
    this.showDeleteDialog(postId);
  }

  showDeleteDialog(postId: number) {

    if (confirm("Dou you want to delete")) {

      this.allPostResponse.content.forEach(value => {
        if (value.id = postId) {
          if (value.userId != this.local.getCredentials()?.content.userId) {
            this.havePermission = false;
            this.notification.showInfo("", "You don't have permission to delete this post")
            return
          }
        }
      })


     if (this.havePermission){
       this.service.deletePost(postId).subscribe(value => {
         debugger
         if (value.statusCode == 200 || value.statusCode < 400) {
           this.notification.showSuccess("", value.message)
           this.selectedOption = "";
           document.location.reload()
           return;
         }
         this.notification.showInfo("", value.message)
       })
     }
      return
    }
  }
}
