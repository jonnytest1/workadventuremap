import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ApiService } from './api-service';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { FriendsComponent } from './friends/friends.component';
import { HealthComponent } from './health/health.component';
import { InventarComponent } from './inventar/inventar.component';
import { MiroComponent } from './miro/miro.component';
import { SharedService } from './shared-service';
import { SpeechRecognitionService } from './speech-recognition-service';

@NgModule({
  imports: [
    BrowserModule, RouterModule.forRoot(routes), NgCircleProgressModule.forRoot(), MatDialogModule,
    MatButtonModule, MatCheckboxModule, FormsModule,
    MatListModule, BrowserAnimationsModule
  ],
  declarations: [
    AppComponent, FriendsComponent,
    HealthComponent,
    MiroComponent,
    InventarComponent
  ],
  providers: [ApiService, SharedService, SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
