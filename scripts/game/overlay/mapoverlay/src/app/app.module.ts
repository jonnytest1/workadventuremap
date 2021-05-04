import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
