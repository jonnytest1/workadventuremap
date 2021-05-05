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


  _autoOpenOverlay: boolean = false

  get autoOpenOverlay() {
    return this._autoOpenOverlay
  }

  set autoOpenOverlay(value: boolean) {
    this._autoOpenOverlay = value;
    this.apiService.passThrough({
      type: "userUpdate",
      data: {
        autoOpenGameOverlay: value
      }
    })
  }

  constructor(private apiService: ApiService) {

    window.addEventListener("keydown", e => {
      console.log(e)
    })


  }

  openMiro() {
    this.apiService.WAApi('openCoWebSite', './pages/miro.html')
  }
}
