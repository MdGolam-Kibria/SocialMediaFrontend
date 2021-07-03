import {Component, OnInit} from '@angular/core';
import {ApiServiceService} from "../../../service/api-service.service";
import {PostResponse} from "../../model/PostResponse";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

   allPostResponse: PostResponse;

  constructor(private service: ApiServiceService) {
  }

  ngOnInit(): void {
    this.service.getAllPost().subscribe(value => {
      this.allPostResponse = value
      debugger
    })
  }

}
