import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ApiService } from './api-service';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent, FriendsComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
