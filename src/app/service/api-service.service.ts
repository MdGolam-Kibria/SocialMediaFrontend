import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostResponse} from "../component/model/PostResponse";
import {map} from "rxjs/operators";
import {LoginResponse} from "../component/model/LoginResponse";
import {LoginDto} from "../component/model/LoginDto";
import {SignUpDto} from "../component/model/SignUpDto";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private BASE_URL = 'http://localhost:8082/BrainStation23/';
  headers = {'content-type': 'application/json'}


  constructor(private httpClient: HttpClient) {
  }

  getAllPost(): Observable<PostResponse> {
    return this.httpClient.get<PostResponse>(this.BASE_URL + "api/v1/Post/GetAllPost")
      .pipe(
        map(response => response)
      );
  }

  loginRequest(loginObject: LoginDto): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      this.BASE_URL + "api/auth/login", loginObject, {headers: this.headers})
      .pipe(map((res => res)));
  }

  signUpRequest(signUpDto: SignUpDto): Observable<PostResponse> {
    return this.httpClient.post<PostResponse>(
      this.BASE_URL + "api/auth/CreateUser", signUpDto, {headers: this.headers})
      .pipe(map((res => res)));
  }

}
