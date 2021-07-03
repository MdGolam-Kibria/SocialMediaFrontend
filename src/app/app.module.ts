import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {UserComponent} from './component/user/user.component';
import {SigninComponent} from './component/user/signin/signin.component';
import {SignUpComponent} from './component/user/sign-up/sign-up.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {ApiServiceService} from "./service/api-service.service";
import { PostComponent } from './component/user/post/post.component';
import {LocalStorage} from "./service/LocalStorage";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

/**
 * configure routes here
 */
const routes: Routes = [
  /*For Show Book Details*/
  {path: 'signUp', component: SignUpComponent},
  {path: 'signIn', component: SigninComponent},
  /*{path: 'books/:id', component: BookDetailsComponent},
  {path: 'books', component: BookListComponent},
  {path: 'search/:keyword', component: BookListComponent},
  {path: 'category/:id', component: BookListComponent},*/
  {path: '', component: PostComponent},
  // {path: '', redirectTo: '/Home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SigninComponent,
    SignUpComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,//for toast
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot()//for toast
  ],
  providers: [
    ApiServiceService,
    LocalStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
