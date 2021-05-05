import { Component } from '@angular/core';
import { ApiService } from './api-service';
import { FeMessage, UnPromise } from './backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'mapoverlay';

  userData: Promise<UnPromise<FeMessage['getUserData']['response']>>;

  constructor(private apiService: ApiService) {
    this.userData = apiService.passThrough({
      type: 'getUserData'
    });
  }
}
